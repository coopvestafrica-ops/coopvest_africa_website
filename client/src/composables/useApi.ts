import { ref } from "vue";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
  message?: string;
  status?: number;
  isRetrying?: boolean;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
  isNetworkError: boolean;
  isTimeoutError: boolean;
  isAuthError: boolean;
  isAborted: boolean;
}

export type RequestInterceptor = (config: {
  endpoint: string;
  options: RequestInit;
}) => Promise<{ endpoint: string; options: RequestInit }>;

export type ResponseInterceptor = (response: ApiResponse<any>) => Promise<ApiResponse<any>>;

export type ErrorInterceptor = (error: ApiError) => Promise<ApiError>;

export interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  enableCache?: boolean;
  cacheTTL?: number; // in milliseconds
  enableDeduplication?: boolean;
  enableLogging?: boolean;
  skipRefreshToken?: boolean;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export interface RequestLog {
  endpoint: string;
  method: string;
  status?: number;
  duration: number;
  timestamp: number;
  error?: string;
}

export const useApi = () => {
  // Use environment variable for backend URL, fallback to relative path
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  
  // Configuration
  const REQUEST_TIMEOUT = 30000; // 30 seconds
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second, increases exponentially
  const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Track ongoing requests for cancellation
  const activeRequests = new Map<string, AbortController>();

  // Request deduplication - track ongoing requests and their promises
  const pendingRequests = new Map<string, Promise<ApiResponse<any>>>();

  // Cache for GET requests
  const requestCache = new Map<string, CacheEntry<any>>();

  // Request logging
  const requestLogs = ref<RequestLog[]>([]);
  const maxLogs = 100; // Keep last 100 requests

  // Interceptors
  const requestInterceptors = ref<RequestInterceptor[]>([]);
  const responseInterceptors = ref<ResponseInterceptor[]>([]);
  const errorInterceptors = ref<ErrorInterceptor[]>([]);

  // Token refresh state
  const isRefreshingToken = ref(false);
  const tokenRefreshPromise = ref<Promise<boolean> | null>(null);

  /**
   * Register a request interceptor
   */
  const useRequestInterceptor = (interceptor: RequestInterceptor) => {
    requestInterceptors.value.push(interceptor);
  };

  /**
   * Register a response interceptor
   */
  const useResponseInterceptor = (interceptor: ResponseInterceptor) => {
    responseInterceptors.value.push(interceptor);
  };

  /**
   * Register an error interceptor
   */
  const useErrorInterceptor = (interceptor: ErrorInterceptor) => {
    errorInterceptors.value.push(interceptor);
  };

  /**
   * Add a request log entry
   */
  const addRequestLog = (log: RequestLog) => {
    requestLogs.value.push(log);
    // Keep only last 100 logs
    if (requestLogs.value.length > maxLogs) {
      requestLogs.value.shift();
    }
  };

  /**
   * Get request logs
   */
  const getRequestLogs = (): RequestLog[] => {
    return [...requestLogs.value];
  };

  /**
   * Clear request logs
   */
  const clearRequestLogs = (): void => {
    requestLogs.value = [];
  };

  /**
   * Invalidate cache for a specific endpoint
   */
  const invalidateCache = (endpoint?: string): void => {
    if (endpoint) {
      requestCache.delete(`GET:${endpoint}`);
    } else {
      requestCache.clear();
    }
  };

  /**
   * Get cache entry if still valid
   */
  const getCachedResponse = <T,>(cacheKey: string, ttl: number): T | null => {
    const cached = requestCache.get(cacheKey);
    if (!cached) return null;
    
    const now = Date.now();
    if (now - cached.timestamp > ttl) {
      requestCache.delete(cacheKey);
      return null;
    }
    
    return cached.data;
  };

  /**
   * Refresh authentication token (override this in your app)
   */
  const refreshAuthToken = async (): Promise<boolean> => {
    // This should be implemented in your app
    // Return true if refresh was successful, false otherwise
    try {
      // Example implementation - replace with your actual token refresh endpoint
      const response = await fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data?.token) {
          localStorage.setItem("auth_token", data.data.token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  };

  /**
   * Handle 401 with token refresh
   */
  const handle401 = async (): Promise<boolean> => {
    // If already refreshing, wait for it
    if (isRefreshingToken.value && tokenRefreshPromise.value) {
      return tokenRefreshPromise.value;
    }

    isRefreshingToken.value = true;
    tokenRefreshPromise.value = refreshAuthToken();

    try {
      const success = await tokenRefreshPromise.value;
      isRefreshingToken.value = false;
      tokenRefreshPromise.value = null;
      
      if (!success) {
        localStorage.removeItem("auth_token");
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      }
      
      return success;
    } catch (error) {
      isRefreshingToken.value = false;
      tokenRefreshPromise.value = null;
      localStorage.removeItem("auth_token");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      return false;
    }
  };

  /**
   * Create a promise that rejects after specified timeout
   */
  const withTimeout = (
    promise: Promise<Response>,
    timeout: number,
    signal: AbortSignal
  ): Promise<Response> => {
    return Promise.race([
      promise,
      new Promise<Response>((_, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error("Request timeout"));
        }, timeout);

        signal.addEventListener("abort", () => {
          clearTimeout(timeoutId);
          reject(new DOMException("Request was aborted", "AbortError"));
        });
      }),
    ]);
  };

  /**
   * Exponential backoff retry logic
   */
  const shouldRetry = (status: number, attempt: number): boolean => {
    if (attempt >= MAX_RETRIES) return false;
    // Retry on network errors, 408 (timeout), 429 (rate limit), 5xx (server errors)
    return status === 408 || status === 429 || (status >= 500 && status < 600);
  };

  /**
   * Detect if error is a network error (cross-browser compatible)
   */
  const isNetworkErrorType = (error: unknown): boolean => {
    if (!(error instanceof Error)) return false;
    // Common network error messages across browsers
    const networkErrorPatterns = [
      "Failed to fetch",
      "NetworkError",
      "Network request failed",
      "The network connection was lost",
      "ERR_",
    ];
    return networkErrorPatterns.some((pattern) => error.message.includes(pattern));
  };

  /**
   * Sleep for specified milliseconds (used for retry delays)
   */
  const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Get user-friendly error message based on status code
   */
  const getErrorMessage = (status: number, defaultMessage: string): string => {
    const messages: Record<number, string> = {
      400: "Invalid request. Please check your input.",
      401: "Your session has expired. Please log in again.",
      403: "You don't have permission to access this resource.",
      404: "The requested resource was not found.",
      408: "Request timed out. Please try again.",
      429: "Too many requests. Please wait a moment before retrying.",
      500: "Server error. Please try again later.",
      502: "Bad gateway. The server is temporarily unavailable.",
      503: "Service unavailable. Please try again later.",
      504: "Gateway timeout. Please try again later.",
    };
    return messages[status] || defaultMessage;
  };

  /**
   * Create a unique key for request tracking
   */
  const getRequestKey = (endpoint: string, method: string = "GET"): string => {
    return `${method}:${endpoint}`;
  };

  /**
   * Apply request interceptors
   */
  const applyRequestInterceptors = async (
    endpoint: string,
    options: RequestInit
  ): Promise<{ endpoint: string; options: RequestInit }> => {
    let config = { endpoint, options };
    for (const interceptor of requestInterceptors.value) {
      config = await interceptor(config);
    }
    return config;
  };

  /**
   * Apply response interceptors
   */
  const applyResponseInterceptors = async (
    response: ApiResponse<any>
  ): Promise<ApiResponse<any>> => {
    let result = response;
    for (const interceptor of responseInterceptors.value) {
      result = await interceptor(result);
    }
    return result;
  };

  /**
   * Apply error interceptors
   */
  const applyErrorInterceptors = async (error: ApiError): Promise<ApiError> => {
    let result = error;
    for (const interceptor of errorInterceptors.value) {
      result = await interceptor(result);
    }
    return result;
  };

  const request = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {},
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> => {
    const startTime = Date.now();
    const method = (options.method || "GET").toUpperCase();
    const requestKey = getRequestKey(endpoint, method);
    const cacheKey = `GET:${endpoint}`;

    // Default config values
    const {
      timeout = REQUEST_TIMEOUT,
      retries = MAX_RETRIES,
      retryDelay = RETRY_DELAY,
      enableCache = method === "GET",
      cacheTTL = DEFAULT_CACHE_TTL,
      enableDeduplication = true,
      enableLogging = true,
      skipRefreshToken = false,
    } = config;

    let attempt = 1;

    // Check cache for GET requests
    if (method === "GET" && enableCache) {
      const cached = getCachedResponse<T>(cacheKey, cacheTTL);
      if (cached !== null) {
        if (enableLogging) {
          addRequestLog({
            endpoint,
            method,
            status: 200,
            duration: 0,
            timestamp: Date.now(),
          });
        }
        return {
          success: true,
          data: cached,
          status: 200,
          message: "Cached response",
        };
      }
    }

    // Check for pending request (deduplication)
    if (enableDeduplication && pendingRequests.has(requestKey)) {
      return pendingRequests.get(requestKey) as Promise<ApiResponse<T>>;
    }

    // Create the actual request promise
    const requestPromise = performRequest<T>(
      endpoint,
      options,
      requestKey,
      attempt,
      timeout,
      retries,
      retryDelay,
      enableCache,
      cacheTTL,
      enableLogging,
      skipRefreshToken,
      startTime,
      cacheKey
    );

    // Store pending request for deduplication
    if (enableDeduplication) {
      pendingRequests.set(requestKey, requestPromise);
      requestPromise
        .finally(() => pendingRequests.delete(requestKey))
        .catch(() => {}); // Ignore promise rejection in cleanup
    }

    return requestPromise;
  };

  /**
   * Perform the actual request
   */
  const performRequest = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {},
    requestKey: string,
    attempt: number,
    timeout: number,
    maxRetries: number,
    retryDelay: number,
    enableCache: boolean,
    cacheTTL: number,
    enableLogging: boolean,
    skipRefreshToken: boolean,
    startTime: number,
    cacheKey: string
  ): Promise<ApiResponse<T>> => {
    try {
      // Apply request interceptors
      const { endpoint: finalEndpoint, options: finalOptions } =
        await applyRequestInterceptors(endpoint, options);

      // Create or reuse AbortController for this request
      let controller = activeRequests.get(requestKey);
      if (!controller) {
        controller = new AbortController();
        activeRequests.set(requestKey, controller);
      }

      // Get token from localStorage for Authorization header
      const token = localStorage.getItem("auth_token");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(typeof finalOptions.headers === "object" &&
        finalOptions.headers !== null
          ? Object.fromEntries(
              Object.entries(finalOptions.headers as Record<string, string>).filter(
                ([key]) => typeof key === "string"
              )
            )
          : {}),
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Make request with timeout and abort support
      const response = await withTimeout(
        fetch(`${baseUrl}${finalEndpoint}`, {
          ...finalOptions,
          headers,
          credentials: "include",
          signal: controller.signal,
        }),
        timeout,
        controller.signal
      );

      let data: Record<string, unknown> = {};
      try {
        data = await response.json();
      } catch (e) {
        // Response is not JSON (e.g., HTML error page)
        data = { message: response.statusText };
      }

      // Handle successful responses
      if (response.ok) {
        const successResponse: ApiResponse<T> = {
          success: true,
          data: (data.data || data) as T,
          message: (data.message as string) || undefined,
          status: response.status,
        };

        // Cache successful GET responses
        if (finalOptions.method === "GET" || !finalOptions.method) {
          if (enableCache) {
            requestCache.set(cacheKey, {
              data: successResponse.data,
              timestamp: Date.now(),
            });
          }
        }

        // Apply response interceptors
        const finalResponse = await applyResponseInterceptors(successResponse);
        
        // Log request
        if (enableLogging) {
          addRequestLog({
            endpoint,
            method: finalOptions.method || "GET",
            status: response.status,
            duration: Date.now() - startTime,
            timestamp: Date.now(),
          });
        }

        activeRequests.delete(requestKey);
        return finalResponse;
      }

      // Handle 401 Unauthorized with token refresh
      if (response.status === 401 && !skipRefreshToken) {
        const refreshed = await handle401();
        if (refreshed && attempt < maxRetries) {
          // Retry request with new token
          const delayMs = retryDelay * Math.pow(2, attempt - 1);
          await sleep(delayMs);
          return performRequest<T>(
            endpoint,
            options,
            requestKey,
            attempt + 1,
            timeout,
            maxRetries,
            retryDelay,
            enableCache,
            cacheTTL,
            enableLogging,
            skipRefreshToken,
            startTime,
            cacheKey
          );
        }
      }

      // Handle error responses with retry logic
      if (shouldRetry(response.status, attempt) && attempt < maxRetries) {
        const delayMs = retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
        await sleep(delayMs);
        return performRequest<T>(
          endpoint,
          options,
          requestKey,
          attempt + 1,
          timeout,
          maxRetries,
          retryDelay,
          enableCache,
          cacheTTL,
          enableLogging,
          skipRefreshToken,
          startTime,
          cacheKey
        );
      }

      const errorResponse: ApiResponse<T> = {
        success: false,
        errors: (data.errors as Record<string, string[]>) || {
          general: [
            getErrorMessage(
              response.status,
              (data.message as string) || "Request failed"
            ),
          ],
        },
        message: getErrorMessage(
          response.status,
          (data.message as string) || "Request failed"
        ),
        status: response.status,
        isRetrying: false,
      };

      // Apply response interceptors
      const finalErrorResponse = await applyResponseInterceptors(errorResponse);
      
      // Log request
      if (enableLogging) {
        addRequestLog({
          endpoint,
          method: finalOptions.method || "GET",
          status: response.status,
          duration: Date.now() - startTime,
          timestamp: Date.now(),
          error: errorResponse.message,
        });
      }

      activeRequests.delete(requestKey);
      return finalErrorResponse;
    } catch (error) {
      const isAborted =
        error instanceof DOMException && error.name === "AbortError";
      const isTimeoutError = error instanceof Error && error.message === "Request timeout";
      const isNetworkError = isNetworkErrorType(error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";

      // Don't retry if request was aborted
      if (isAborted) {
        activeRequests.delete(requestKey);
        
        if (enableLogging) {
          addRequestLog({
            endpoint,
            method: (options.method || "GET").toUpperCase(),
            status: 0,
            duration: Date.now() - startTime,
            timestamp: Date.now(),
            error: "Request was cancelled",
          });
        }

        return {
          success: false,
          errors: { general: ["Request was cancelled"] },
          message: "Request was cancelled",
          status: 0,
          isRetrying: false,
        };
      }

      // Retry on network errors (except timeout)
      if (isNetworkError && attempt < maxRetries) {
        const delayMs = retryDelay * Math.pow(2, attempt - 1);
        await sleep(delayMs);
        return performRequest<T>(
          endpoint,
          options,
          requestKey,
          attempt + 1,
          timeout,
          maxRetries,
          retryDelay,
          enableCache,
          cacheTTL,
          enableLogging,
          skipRefreshToken,
          startTime,
          cacheKey
        );
      }

      const userMessage = isTimeoutError
        ? "Request took too long. Please check your connection and try again."
        : isNetworkError
        ? "Network error. Please check your connection."
        : errorMessage;

      const apiError: ApiError = {
        status: 0,
        message: userMessage,
        isNetworkError,
        isTimeoutError,
        isAuthError: false,
        isAborted,
      };

      // Apply error interceptors
      const finalError = await applyErrorInterceptors(apiError);

      const errorResponse: ApiResponse<T> = {
        success: false,
        errors: { general: [finalError.message] },
        message: finalError.message,
        status: 0,
        isRetrying: false,
      };

      // Log request
      if (enableLogging) {
        addRequestLog({
          endpoint,
          method: (options.method || "GET").toUpperCase(),
          status: 0,
          duration: Date.now() - startTime,
          timestamp: Date.now(),
          error: finalError.message,
        });
      }

      activeRequests.delete(requestKey);
      return errorResponse;
    }
  };

  const get = <T = unknown>(
    endpoint: string,
    options?: Omit<RequestInit, "method">,
    config?: RequestConfig
  ) => request<T>(endpoint, { ...options, method: "GET" }, config);

  const post = <T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestInit, "method" | "body">,
    config?: RequestConfig
  ) =>
    request<T>(
      endpoint,
      {
        ...options,
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      },
      config
    );

  const put = <T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestInit, "method" | "body">,
    config?: RequestConfig
  ) =>
    request<T>(
      endpoint,
      {
        ...options,
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
      },
      config
    );

  const patch = <T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestInit, "method" | "body">,
    config?: RequestConfig
  ) =>
    request<T>(
      endpoint,
      {
        ...options,
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
      },
      config
    );

  const del = <T = unknown>(
    endpoint: string,
    options?: Omit<RequestInit, "method">,
    config?: RequestConfig
  ) => request<T>(endpoint, { ...options, method: "DELETE" }, config);

  /**
   * Cancel a specific request
   */
  const cancelRequest = (endpoint: string, method: string = "GET"): void => {
    const requestKey = getRequestKey(endpoint, method);
    const controller = activeRequests.get(requestKey);
    if (controller) {
      controller.abort();
      activeRequests.delete(requestKey);
    }
  };

  /**
   * Cancel all active requests
   */
  const cancelAllRequests = (): void => {
    activeRequests.forEach((controller) => controller.abort());
    activeRequests.clear();
  };

  /**
   * Check if network is available (simple connectivity test)
   */
  const isOnline = (): boolean => {
    return typeof navigator !== "undefined" && navigator.onLine;
  };

  return {
    get,
    post,
    put,
    patch,
    del,
    request,
    isOnline,
    cancelRequest,
    cancelAllRequests,
    useRequestInterceptor,
    useResponseInterceptor,
    useErrorInterceptor,
    // Logging
    getRequestLogs,
    clearRequestLogs,
    // Caching
    invalidateCache,
    // Token refresh
    refreshAuthToken,
  };
};

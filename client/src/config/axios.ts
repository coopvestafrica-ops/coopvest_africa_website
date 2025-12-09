import axios, { AxiosInstance, AxiosError } from 'axios';
import { auth } from './firebase';

// Create axios instance with default config
export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - Add Firebase token to all requests
  instance.interceptors.request.use(
    async (config) => {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Failed to get ID token:', error);
      }
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle errors and token expiration
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const newToken = await auth.currentUser?.getIdToken(true);
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // Sign out user and redirect to login
          try {
            await auth.signOut();
            window.location.href = '/login';
          } catch (signOutError) {
            console.error('Sign out failed:', signOutError);
          }
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.error('Access forbidden:', error.response.data);
      }

      // Handle 404 Not Found
      if (error.response?.status === 404) {
        console.error('Resource not found:', error.response.data);
      }

      // Handle 500 Server Error
      if (error.response?.status === 500) {
        console.error('Server error:', error.response.data);
      }

      // Handle network errors
      if (!error.response) {
        console.error('Network error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Export singleton instance
export const apiClient = createAxiosInstance();

// Helper functions for common requests
export const api = {
  get: (url: string, config?: any) => apiClient.get(url, config),
  post: (url: string, data?: any, config?: any) => apiClient.post(url, data, config),
  put: (url: string, data?: any, config?: any) => apiClient.put(url, data, config),
  patch: (url: string, data?: any, config?: any) => apiClient.patch(url, data, config),
  delete: (url: string, config?: any) => apiClient.delete(url, config),
};

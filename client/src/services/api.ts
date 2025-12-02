import axios, { AxiosInstance, AxiosError } from "axios";

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  password_confirmation: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Load token from localStorage
    this.token = localStorage.getItem("auth_token");
    if (this.token) {
      this.setAuthToken(this.token);
    }

    // Add response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
              const response = await this.api.post("/auth/refresh", {});
              const newToken = response.data.data.token;
              this.setAuthToken(newToken);
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private setAuthToken(token: string): void {
    this.token = token;
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("auth_token", token);
  }

  // ==================== Authentication ====================

  async register(data: RegisterRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await this.api.post("/auth/register", data);
      if (response.data.data?.token) {
        this.setAuthToken(response.data.data.token);
        localStorage.setItem("refresh_token", response.data.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async login(data: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await this.api.post("/auth/login", data);
      if (response.data.data?.token) {
        this.setAuthToken(response.data.data.token);
        localStorage.setItem("refresh_token", response.data.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/auth/logout");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      this.token = null;
      delete this.api.defaults.headers.common["Authorization"];
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await this.api.get("/auth/me");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async requestPasswordReset(email: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/auth/password-reset/request", { email });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/auth/password-reset/confirm", {
        token,
        new_password: newPassword,
        new_password_confirmation: newPassword,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await this.api.post("/auth/refresh");
      if (response.data.data?.token) {
        this.setAuthToken(response.data.data.token);
      }
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ==================== KYC ====================

  async submitKYC(formData: FormData): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/kyc/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getKYCStatus(): Promise<ApiResponse<{ status: string }>> {
    try {
      const response = await this.api.get("/kyc/status");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ==================== 2FA ====================

  async setupTwoFA(): Promise<ApiResponse<{ qrCode: string; secret: string; backupCodes: string[] }>> {
    try {
      const response = await this.api.post("/2fa/setup");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async confirmTwoFA(code: string): Promise<ApiResponse<{ backupCodes: string[] }>> {
    try {
      const response = await this.api.post("/2fa/confirm", { code });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async verifyTwoFA(code: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/2fa/verify", { code });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async disableTwoFA(password: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/2fa/disable", { password });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ==================== Member ====================

  async getMemberProfile(): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get("/member/profile");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateMemberProfile(data: any): Promise<ApiResponse> {
    try {
      const response = await this.api.put("/member/profile", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMemberDashboard(): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get("/member/dashboard");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMemberTransactions(limit = 20, offset = 0): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get(`/member/transactions?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMemberSavings(): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get("/member/savings");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getMemberLoans(): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get("/member/loans");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ==================== Loans ====================

  async applyForLoan(data: {
    amount: number;
    duration_months: number;
    purpose: string;
  }): Promise<ApiResponse> {
    try {
      const response = await this.api.post("/loans/apply", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async calculateLoan(data: {
    amount: number;
    duration_months: number;
  }): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post("/loans/calculate", data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getLoanDetails(id: number): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get(`/loans/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async makeLoanPayment(loanId: number, amount: number): Promise<ApiResponse> {
    try {
      const response = await this.api.post(`/loans/${loanId}/payment`, { amount });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ==================== Admin ====================

  async getPendingLoans(): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get("/loans/admin/pending");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async approveLoan(id: number): Promise<ApiResponse> {
    try {
      const response = await this.api.post(`/loans/${id}/approve`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async rejectLoan(id: number, reason: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post(`/loans/${id}/reject`, { reason });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getKYCVerifications(): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.get("/admin/kyc");
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async approveKYC(id: number): Promise<ApiResponse> {
    try {
      const response = await this.api.post(`/kyc/${id}/approve`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async rejectKYC(id: number, reason: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post(`/kyc/${id}/reject`, { reason });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // ==================== Error Handling ====================

  private handleError(error: any): ApiResponse {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;
      return {
        success: false,
        message: axiosError.response?.data?.message || "An error occurred",
        errors: axiosError.response?.data?.errors,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }

  // ==================== Utility ====================

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  clearAuth(): void {
    this.token = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    delete this.api.defaults.headers.common["Authorization"];
  }
}

export default new ApiService();

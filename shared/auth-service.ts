/**
 * Shared Authentication Service
 * Handles authentication across all platforms
 */

import { apiClient, ApiResponse } from './api-client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'member' | 'admin' | 'super_admin';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export class AuthService {
  private static readonly TOKEN_KEY = 'coopvest_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'coopvest_refresh_token';
  private static readonly USER_KEY = 'coopvest_user';

  /**
   * Register new user
   */
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    if (response.data) {
      this.saveTokens(response.data.tokens);
      this.saveUser(response.data.user);
    }

    return response.data!;
  }

  /**
   * Login user
   */
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    
    if (response.data) {
      this.saveTokens(response.data.tokens);
      this.saveUser(response.data.user);
      apiClient.setToken(response.data.tokens.accessToken);
    }

    return response.data!;
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<AuthTokens>('/auth/refresh', {
      refreshToken,
    });

    if (response.data) {
      this.saveTokens(response.data);
      apiClient.setToken(response.data.accessToken);
    }

    return response.data!;
  }

  /**
   * Get current user
   */
  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    
    if (response.data) {
      this.saveUser(response.data);
    }

    return response.data!;
  }

  /**
   * Update user profile
   */
  static async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>('/auth/profile', data);
    
    if (response.data) {
      this.saveUser(response.data);
    }

    return response.data!;
  }

  /**
   * Change password
   */
  static async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
    });
  }

  /**
   * Verify email
   */
  static async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify-email', { token });
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Get access token
   */
  static getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get refresh token
   */
  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Get stored user
   */
  static getUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Check if user has role
   */
  static hasRole(role: string | string[]): boolean {
    const user = this.getUser();
    if (!user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }

    return user.role === role;
  }

  /**
   * Check if user is admin
   */
  static isAdmin(): boolean {
    return this.hasRole(['admin', 'super_admin']);
  }

  /**
   * Check if user is super admin
   */
  static isSuperAdmin(): boolean {
    return this.hasRole('super_admin');
  }

  /**
   * Save tokens to storage
   */
  private static saveTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.TOKEN_KEY, tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
    }
    apiClient.setToken(tokens.accessToken);
  }

  /**
   * Save user to storage
   */
  private static saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Clear authentication data
   */
  static clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    apiClient.setToken(null);
  }

  /**
   * Initialize auth from storage
   */
  static initializeAuth(): void {
    const token = this.getAccessToken();
    if (token) {
      apiClient.setToken(token);
    }
  }
}

export default AuthService;

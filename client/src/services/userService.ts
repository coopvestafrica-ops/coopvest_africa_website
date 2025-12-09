import { api } from '@/config/axios';

export interface UserProfile {
  id?: string;
  firebase_uid: string;
  email: string;
  name?: string;
  phone?: string;
  photoURL?: string;
  profile_data?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  photoURL?: string;
  [key: string]: any;
}

/**
 * User service for handling user-related API calls
 */
export const userService = {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await api.get('/auth/profile');
      return response.data.user;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    try {
      const response = await api.put('/auth/profile', data);
      return response.data.user;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserProfile> {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data.user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  },

  /**
   * Search users
   */
  async searchUsers(query: string): Promise<UserProfile[]> {
    try {
      const response = await api.get('/users/search', {
        params: { q: query },
      });
      return response.data.users;
    } catch (error) {
      console.error('Failed to search users:', error);
      throw error;
    }
  },

  /**
   * Upload user avatar
   */
  async uploadAvatar(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.url;
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw error;
    }
  },

  /**
   * Delete user account
   */
  async deleteAccount(): Promise<void> {
    try {
      await api.delete('/auth/account');
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error;
    }
  },

  /**
   * Verify email
   */
  async verifyEmail(code: string): Promise<void> {
    try {
      await api.post('/auth/verify-email', { code });
    } catch (error) {
      console.error('Failed to verify email:', error);
      throw error;
    }
  },

  /**
   * Resend verification email
   */
  async resendVerificationEmail(): Promise<void> {
    try {
      await api.post('/auth/resend-verification-email');
    } catch (error) {
      console.error('Failed to resend verification email:', error);
      throw error;
    }
  },

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.post('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
    } catch (error) {
      console.error('Failed to change password:', error);
      throw error;
    }
  },

  /**
   * Enable two-factor authentication
   */
  async enableTwoFactor(): Promise<{ secret: string; qrCode: string }> {
    try {
      const response = await api.post('/auth/2fa/enable');
      return response.data;
    } catch (error) {
      console.error('Failed to enable 2FA:', error);
      throw error;
    }
  },

  /**
   * Verify two-factor authentication code
   */
  async verifyTwoFactorCode(code: string): Promise<void> {
    try {
      await api.post('/auth/2fa/verify', { code });
    } catch (error) {
      console.error('Failed to verify 2FA code:', error);
      throw error;
    }
  },

  /**
   * Disable two-factor authentication
   */
  async disableTwoFactor(): Promise<void> {
    try {
      await api.post('/auth/2fa/disable');
    } catch (error) {
      console.error('Failed to disable 2FA:', error);
      throw error;
    }
  },
};

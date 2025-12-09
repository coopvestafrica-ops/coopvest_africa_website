import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

interface UseAuthFormOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Custom hook for handling authentication form submissions
 * Manages loading state and error handling
 */
export function useAuthForm(options?: UseAuthFormOptions) {
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await login(email, password);
        options?.onSuccess?.();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
        options?.onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [login, options]
  );

  const handleSignup = useCallback(
    async (email: string, password: string, displayName: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await signup(email, password, displayName);
        options?.onSuccess?.();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Signup failed';
        setError(errorMessage);
        options?.onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [signup, options]
  );

  const handleGoogleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithGoogle();
      options?.onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google login failed';
      setError(errorMessage);
      options?.onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loginWithGoogle, options]);

  const handleResetPassword = useCallback(
    async (email: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await resetPassword(email);
        options?.onSuccess?.();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
        setError(errorMessage);
        options?.onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [resetPassword, options]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    handleLogin,
    handleSignup,
    handleGoogleLogin,
    handleResetPassword,
    clearError,
  };
}

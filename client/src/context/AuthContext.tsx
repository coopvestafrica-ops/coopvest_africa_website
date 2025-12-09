import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  AuthError,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { apiClient } from '@/config/axios';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string>;
  resetPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (code: string, newPassword: string) => Promise<void>;
  verifyPasswordResetCode: (code: string) => Promise<string>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Sync user to backend when authenticated
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          await apiClient.post('/auth/sync-user', {
            firebase_uid: currentUser.uid,
            user_data: {
              email: currentUser.email,
              name: currentUser.displayName,
              phone: currentUser.phoneNumber,
              photoURL: currentUser.photoURL,
            },
          });
        } catch (err) {
          console.error('Failed to sync user to backend:', err);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuthError = (err: unknown) => {
    const authError = err as AuthError;
    let errorMessage = 'An error occurred';

    switch (authError.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/user-disabled':
        errorMessage = 'User account has been disabled';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password';
        break;
      case 'auth/email-already-in-use':
        errorMessage = 'Email already in use';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak (minimum 6 characters)';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Operation not allowed';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many login attempts. Please try again later';
        break;
      default:
        errorMessage = authError.message || 'An error occurred';
    }

    setError(errorMessage);
    throw new Error(errorMessage);
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName,
      });

      // Refresh user to get updated profile
      setUser(userCredential.user);
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      await signInWithPopup(auth, provider);
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const getIdToken = useCallback(async (): Promise<string> => {
    try {
      const token = await auth.currentUser?.getIdToken();
      return token || '';
    } catch (err) {
      console.error('Failed to get ID token:', err);
      return '';
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const confirmPasswordResetFn = useCallback(async (code: string, newPassword: string) => {
    try {
      setError(null);
      await confirmPasswordReset(auth, code, newPassword);
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const verifyPasswordResetCodeFn = useCallback(async (code: string): Promise<string> => {
    try {
      setError(null);
      return await verifyPasswordResetCode(auth, code);
    } catch (err) {
      handleAuthError(err);
      return '';
    }
  }, []);

  const updateUserProfile = useCallback(async (displayName: string, photoURL?: string) => {
    try {
      setError(null);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });
        setUser(auth.currentUser);
      }
    } catch (err) {
      handleAuthError(err);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    loginWithGoogle,
    logout,
    getIdToken,
    resetPassword,
    confirmPasswordReset: confirmPasswordResetFn,
    verifyPasswordResetCode: verifyPasswordResetCodeFn,
    updateUserProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

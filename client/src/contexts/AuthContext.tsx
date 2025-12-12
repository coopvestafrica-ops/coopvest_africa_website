import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "member" | "admin" | "super_admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  getRedirectUrl: (role?: UserRole) => string;
}

/**
 * Get the appropriate redirect URL based on user role
 */
export function getRedirectUrlByRole(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "super_admin":
      return "/super-admin";
    case "member":
    default:
      return "/member/dashboard";
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication - replace with actual API call
    try {
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0],
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_user");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isAdmin: user?.role === "admin" || user?.role === "super_admin",
    isSuperAdmin: user?.role === "super_admin",
    login,
    logout,
    setUser,
    getRedirectUrl: (role) => getRedirectUrlByRole(role || user?.role || "member"),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
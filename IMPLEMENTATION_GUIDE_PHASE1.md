# Phase 1 Implementation Guide - Security & Core Functionality

## Overview
This guide provides step-by-step instructions for implementing the highest-priority features that will make your application more secure and functional.

---

## 1. Protected Routes & Authorization

### Current State
- `ProtectedRoute.tsx` exists but needs enhancement
- Basic auth context is in place

### Implementation Steps

#### Step 1: Enhance ProtectedRoute Component

**File**: `client/src/components/ProtectedRoute.tsx`

```typescript
import { useAuthContext } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "member" | "admin" | "super_admin";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthContext();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      setLocation("/login");
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      // Redirect to unauthorized page if role doesn't match
      if (requiredRole === "admin" || requiredRole === "super_admin") {
        setLocation("/member/dashboard");
      } else {
        setLocation("/");
      }
    }
  }, [isAuthenticated, user, requiredRole, setLocation]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Access Denied
          </h1>
          <p className="text-slate-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
```

#### Step 2: Update App.tsx to Use Protected Routes

**File**: `client/src/App.tsx`

```typescript
// Add ProtectedRoute import
import ProtectedRoute from "./components/ProtectedRoute";

// Update Router function
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      
      {/* Protected Member Routes */}
      <Route path={"/member/dashboard"}>
        <ProtectedRoute requiredRole="member">
          <MemberDashboard />
        </ProtectedRoute>
      </Route>
      <Route path={"/member/savings"}>
        <ProtectedRoute requiredRole="member">
          <Savings />
        </ProtectedRoute>
      </Route>
      <Route path={"/member/kyc"}>
        <ProtectedRoute requiredRole="member">
          <KYCVerification />
        </ProtectedRoute>
      </Route>
      <Route path={"/member/2fa"}>
        <ProtectedRoute requiredRole="member">
          <TwoFASetup />
        </ProtectedRoute>
      </Route>
      
      {/* Protected Admin Routes */}
      <Route path={"/admin"}>
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      
      {/* Protected Super Admin Routes */}
      <Route path={"/super-admin"}>
        <ProtectedRoute requiredRole="super_admin">
          <SuperAdminPanel />
        </ProtectedRoute>
      </Route>
      
      <Route path={"/password-reset"} component={PasswordReset} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

---

## 2. Session Management & Security

### Implementation Steps

#### Step 1: Enhance AuthContext with Session Management

**File**: `client/src/contexts/AuthContext.tsx`

Add the following to your AuthContext:

```typescript
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const INACTIVITY_CHECK_INTERVAL = 60 * 1000; // Check every minute

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [inactivityTimeout, setInactivityTimeout] = useState<NodeJS.Timeout | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    const sessionStart = localStorage.getItem("session_start");
    
    if (storedUser && sessionStart) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const sessionAge = Date.now() - parseInt(sessionStart);
        
        // Check if session has expired
        if (sessionAge > SESSION_TIMEOUT) {
          localStorage.removeItem("auth_user");
          localStorage.removeItem("session_start");
        } else {
          setUser(parsedUser);
          setIsAuthenticated(true);
          startSessionTimer();
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("auth_user");
        localStorage.removeItem("session_start");
      }
    }
  }, []);

  const startSessionTimer = () => {
    // Clear existing timers
    if (sessionTimeout) clearTimeout(sessionTimeout);
    if (inactivityTimeout) clearTimeout(inactivityTimeout);

    // Set session timeout
    const timeout = setTimeout(() => {
      logout();
      console.warn("Session expired due to timeout");
    }, SESSION_TIMEOUT);

    setSessionTimeout(timeout);
  };

  const resetInactivityTimer = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);

    const timeout = setTimeout(() => {
      logout();
      console.warn("Session expired due to inactivity");
    }, SESSION_TIMEOUT);

    setInactivityTimeout(timeout);
  };

  // Track user activity
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [isAuthenticated]);

  const login = async (email: string, password: string, role: UserRole) => {
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
      localStorage.setItem("session_start", Date.now().toString());
      
      startSessionTimer();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("session_start");
    
    if (sessionTimeout) clearTimeout(sessionTimeout);
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
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
```

---

## 3. Form Validation & Error Handling

### Implementation Steps

#### Step 1: Create Validation Utilities

**File**: `client/src/utils/validation.ts`

```typescript
import { z } from "zod";

// Email validation
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email is required");

// Password validation
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Register schema
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// KYC schema
export const kycSchema = z.object({
  idType: z.enum(["passport", "drivers_license", "national_id"]),
  idNumber: z.string().min(5, "ID number is required"),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18;
  }, "You must be at least 18 years old"),
  address: z.string().min(10, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type KYCFormData = z.infer<typeof kycSchema>;
```

#### Step 2: Update Login Form with Validation

**File**: `client/src/pages/Login.tsx`

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/utils/validation";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuthContext();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, "member");
      // Success handling...
    } catch (error) {
      // Error handling...
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          {...register("password")}
          type="password"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
```

---

## 4. Loading States & Skeletons

### Implementation Steps

#### Step 1: Create Skeleton Components

**File**: `client/src/components/Skeleton.tsx`

```typescript
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200 dark:bg-slate-800",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-20" />
        </div>
      ))}
    </div>
  );
}
```

#### Step 2: Use Skeletons in Components

```typescript
import { Skeleton, SkeletonCard } from "@/components/Skeleton";

export default function MemberDashboard() {
  const { data, isLoading } = useQuery(/* ... */);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    // Your actual content
  );
}
```

---

## 5. Quick Implementation Checklist

- [ ] Enhance ProtectedRoute component
- [ ] Update App.tsx with protected routes
- [ ] Add session management to AuthContext
- [ ] Create validation utilities
- [ ] Update Login form with validation
- [ ] Create Skeleton components
- [ ] Add loading states to dashboards
- [ ] Test all protected routes
- [ ] Test session timeout
- [ ] Test form validation

---

## 6. Testing Checklist

### Protected Routes
- [ ] Unauthenticated user redirected to login
- [ ] Authenticated user can access member routes
- [ ] Admin user can access admin routes
- [ ] Member user cannot access admin routes

### Session Management
- [ ] Session timeout works after 30 minutes
- [ ] Inactivity timeout works
- [ ] User activity resets timeout
- [ ] Logout clears session

### Form Validation
- [ ] Email validation works
- [ ] Password validation works
- [ ] Error messages display correctly
- [ ] Form submission works with valid data

---

## 7. Next Steps

After completing Phase 1:
1. Test thoroughly in development
2. Deploy to staging environment
3. Get user feedback
4. Move to Phase 2: User Experience improvements

---

## 📞 Need Help?

For detailed code examples or troubleshooting, ask for specific implementation help!

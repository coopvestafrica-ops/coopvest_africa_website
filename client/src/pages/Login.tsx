import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password, "member");
      setSuccess(true);
      // Redirect to member dashboard after successful login
      setTimeout(() => {
        setLocation("/member/dashboard");
      }, 1000);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: "member" | "admin" | "super_admin") => {
    setIsLoading(true);
    try {
      await login(`demo.${role}@coopvest.africa`, "password123", role);
      setSuccess(true);
      // Redirect to appropriate dashboard based on role
      setTimeout(() => {
        if (role === "member") setLocation("/member/dashboard");
        else if (role === "admin") setLocation("/admin");
        else setLocation("/super-admin");
      }, 1000);
    } catch (err) {
      setError("Demo login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navigation />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Sign in to your Coopvest Africa account
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">
                  Login successful!
                </p>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Redirecting to your dashboard...
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Demo Accounts (for testing):
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin("member")}
                disabled={isLoading}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                Demo Member Account
              </button>
              <button
                onClick={() => handleDemoLogin("admin")}
                disabled={isLoading}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                Demo Admin Account
              </button>
              <button
                onClick={() => handleDemoLogin("super_admin")}
                disabled={isLoading}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                Demo Super Admin Account
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

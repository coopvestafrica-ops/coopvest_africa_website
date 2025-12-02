import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useApi } from "@/composables/useApi";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "member" | "admin" | "super_admin";
  avatar?: string;
  kyc_status?: "unverified" | "pending" | "verified" | "rejected";
}

export const useAuthStore = defineStore("auth", () => {
  const api = useApi();

  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("auth_token"));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isMember = computed(() => user.value?.role === "member");
  const isAdmin = computed(() => ["admin", "super_admin"].includes(user.value?.role || ""));
  const isSuperAdmin = computed(() => user.value?.role === "super_admin");

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post("/auth/login", { email, password });

      if (!response.success) {
        error.value = response.message || "Login failed";
        return false;
      }

      const data = response.data as any;
      token.value = data.token;
      user.value = data.user;
      localStorage.setItem("auth_token", data.token);
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Login error";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("auth_token");
  };

  const register = async (credentials: { name: string; email: string; password: string; phone?: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post("/auth/register", credentials);

      if (!response.success) {
        error.value = response.message || "Registration failed";
        return false;
      }

      const data = response.data as any;
      token.value = data.token;
      user.value = data.user;
      localStorage.setItem("auth_token", data.token);
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Registration error";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const fetchCurrentUser = async () => {
    if (!token.value) return false;
    
    loading.value = true;
    try {
      const response = await api.get("/auth/me");

      if (!response.success) {
        logout();
        return false;
      }

      user.value = response.data as User;
      return true;
    } catch (err) {
      logout();
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isMember,
    isAdmin,
    isSuperAdmin,
    login,
    logout,
    register,
    fetchCurrentUser,
  };
});

import { useRouter } from "vue-router";
import { useAuthStore } from "@/_core/stores/authStore";
import { useToast } from "./useToast";
import { onMounted, onBeforeUnmount } from "vue";

/**
 * Composable to handle authentication-related events and state
 */
export const useAuthEvents = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const { error } = useToast();

  /**
   * Listen for unauthorized (401) errors from API
   */
  const setupAuthListeners = () => {
    const handleUnauthorized = () => {
      error("Your session has expired. Please log in again.", {
        duration: 5000,
      });
      authStore.logout();
      router.push({ name: "Login", query: { redirect: router.currentRoute.value.fullPath } });
    };

    const handleOnline = () => {
      // Optionally show a message when connection is restored
      console.log("Connection restored");
    };

    const handleOffline = () => {
      error("You are currently offline. Some features may not be available.", {
        duration: 0, // Don't auto-dismiss
      });
    };

    // Listen for auth:unauthorized event from useApi
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  };

  /**
   * Setup all auth-related listeners on component mount
   */
  const setupAuthEventListeners = () => {
    onMounted(() => {
      const cleanup = setupAuthListeners();
      onBeforeUnmount(() => cleanup());
    });
  };

  return {
    setupAuthListeners,
    setupAuthEventListeners,
  };
};

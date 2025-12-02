<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              :disabled="loading"
              aria-label="Email address"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium mb-2">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              :disabled="loading"
              aria-label="Password"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ loading ? "Logging in..." : "Login" }}</span>
          </button>
        </form>
        <div class="flex gap-4 mt-4 text-sm">
          <RouterLink
            to="/password-reset"
            class="text-blue-600 hover:underline flex-1"
          >
            Forgot password?
          </RouterLink>
          <span class="text-slate-400">•</span>
          <RouterLink
            to="/register"
            class="text-blue-600 hover:underline flex-1 text-right"
          >
            Sign up
          </RouterLink>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/_core/stores/authStore";
import { useToast } from "@/composables/useToast";
import { useAuthEvents } from "@/composables/useAuthEvents";
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import { RouterLink } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const { error: showError, success } = useToast();
const { setupAuthEventListeners } = useAuthEvents();

// Setup event listeners
setupAuthEventListeners();

const email = ref("");
const password = ref("");
const loading = ref(false);
const errors = ref<Record<string, string>>({});

const validateForm = (): boolean => {
  errors.value = {};
  
  if (!email.value) {
    errors.value.email = "Email is required";
  } else if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.value.email = "Please enter a valid email address";
  }
  
  if (!password.value) {
    errors.value.password = "Password is required";
  } else if (password.value.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleLogin = async () => {
  if (!validateForm()) return;
  
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    if (authStore.isAuthenticated) {
      success("Welcome back! Redirecting to your dashboard...");
      // Redirect to requested page or dashboard
      const redirect = router.currentRoute.value.query.redirect as string;
      router.push(redirect || "/dashboard");
    }
  } catch (err) {
    showError("Login failed. Please check your credentials and try again.");
  } finally {
    loading.value = false;
  }
};
</script>


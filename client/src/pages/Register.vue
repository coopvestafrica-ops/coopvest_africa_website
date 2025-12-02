<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />

    <div class="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 border border-slate-200 dark:border-slate-700">
        <h1 class="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p class="text-slate-600 dark:text-slate-400 text-center mb-8">Join Coopvest Africa today</p>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="+234 (0) 123 456 7890"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
            <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
              At least 8 characters, including uppercase, lowercase, and numbers
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <input
              id="terms"
              v-model="form.agreedToTerms"
              type="checkbox"
              class="mt-1 accent-blue-600"
            />
            <label for="terms" class="ml-3 text-sm text-slate-600 dark:text-slate-400">
              I agree to the
              <router-link to="/terms" class="text-blue-600 hover:underline">Terms & Conditions</router-link>
              and
              <router-link to="/privacy" class="text-blue-600 hover:underline">Privacy Policy</router-link>
            </label>
          </div>
          <p v-if="errors.agreedToTerms" class="text-sm text-red-600">{{ errors.agreedToTerms }}</p>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center"
          >
            <span v-if="!loading">Create Account</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          </button>

          <!-- Error Message -->
          <div v-if="generalError" class="p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-sm">
            {{ generalError }}
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm">
            {{ successMessage }}
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-slate-600 dark:text-slate-400">
            Already have an account?
            <router-link to="/login" class="text-blue-600 hover:underline font-medium">Sign In</router-link>
          </p>
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
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const generalError = ref("");
const successMessage = ref("");

const form = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
});

const errors = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: "",
});

const validateForm = () => {
  errors.value = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: "",
  };

  if (!form.value.name.trim()) {
    errors.value.name = "Full name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email.trim() || !emailRegex.test(form.value.email)) {
    errors.value.email = "Valid email is required";
  }

  if (form.value.password.length < 8) {
    errors.value.password = "Password must be at least 8 characters";
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = "Passwords do not match";
  }

  if (!form.value.agreedToTerms) {
    errors.value.agreedToTerms = "You must agree to the terms";
  }

  return Object.values(errors.value).every((e) => e === "");
};

const handleRegister = async () => {
  generalError.value = "";
  successMessage.value = "";

  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    const success = await authStore.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone,
    });

    if (success) {
      successMessage.value = "Account created successfully! Redirecting...";
      setTimeout(() => {
        router.push("/member-dashboard");
      }, 1500);
    } else {
      generalError.value = "Registration failed. Please try again.";
    }
  } catch (error: any) {
    generalError.value = error?.message || "An error occurred during registration";
  } finally {
    loading.value = false;
  }
};
</script>

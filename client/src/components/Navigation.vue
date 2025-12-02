<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <img :src="appLogo" :alt="appTitle" class="h-8 w-8" />
          <span class="font-bold text-xl hidden sm:inline">{{ appTitle }}</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <RouterLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</RouterLink>
          <RouterLink to="/about" class="hover:text-blue-600 dark:hover:text-blue-400 transition">About</RouterLink>
          <a href="#services" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Services</a>
          <a href="#faq" class="hover:text-blue-600 dark:hover:text-blue-400 transition">FAQ</a>
        </nav>

        <!-- Right Section -->
        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button
            @click="themeStore.toggleTheme"
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            :title="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <Sun v-if="themeStore.isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <!-- Auth Buttons -->
          <div v-if="!authStore.isAuthenticated" class="flex gap-2">
            <RouterLink to="/login" class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition">
              Login
            </RouterLink>
            <RouterLink to="/register" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Sign Up
            </RouterLink>
          </div>

          <div v-else class="flex gap-2 items-center">
            <span class="text-sm">{{ authStore.user?.name }}</span>
            <button
              @click="authStore.logout"
              class="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
            >
              Logout
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button class="md:hidden p-2">
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/_core/stores/authStore";
import { useThemeStore } from "@/_core/stores/themeStore";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Sun, Moon, Menu } from "lucide-vue-next";

const authStore = useAuthStore();
const themeStore = useThemeStore();

const appLogo = APP_LOGO;
const appTitle = APP_TITLE;
</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300" :class="themeClass">
    <ErrorBoundary>
      <Toaster />
      <TooltipProvider>
        <RouterView />
        <Chatbot />
      </TooltipProvider>
    </ErrorBoundary>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "@/_core/stores/themeStore";
import { useAuthStore } from "@/_core/stores/authStore";
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import Chatbot from "@/components/Chatbot.vue";
import { Toaster } from "vue-sonner";
import { TooltipProvider } from "radix-vue";

const themeStore = useThemeStore();

const themeClass = computed(() => ({
  "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50": true,
}));
</script>

<style scoped>
/* Theme transition */
:deep(*) {
  @apply transition-colors duration-300;
}
</style>

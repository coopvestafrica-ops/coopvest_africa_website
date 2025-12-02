<template>
  <div v-if="hasError" class="p-8 bg-red-50 dark:bg-red-950 rounded-lg">
    <h2 class="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">Something went wrong</h2>
    <p class="text-red-600 dark:text-red-300 mb-4">{{ error }}</p>
    <button
      @click="resetError"
      class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      Try again
    </button>
  </div>

  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";

const hasError = ref(false);
const error = ref<string>("");

const resetError = () => {
  hasError.value = false;
  error.value = "";
};

onErrorCaptured((err) => {
  hasError.value = true;
  error.value = err instanceof Error ? err.message : String(err);
  return false;
});
</script>

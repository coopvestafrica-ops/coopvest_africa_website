<template>
  <div class="fixed bottom-4 right-4 z-40">
    <button
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
    >
      <MessageCircle v-if="!isOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </button>

    <div v-if="isOpen" class="absolute bottom-20 right-0 w-80 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="p-4 bg-blue-600 text-white">
        <h3 class="font-bold">Chat with us</h3>
        <p class="text-sm text-blue-100">Available 24/7</p>
      </div>
      <div class="h-80 overflow-y-auto p-4 space-y-4">
        <div class="text-sm text-slate-600 dark:text-slate-400">
          Hi! How can we help you today?
        </div>
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        class="w-full p-3 border-t border-slate-200 dark:border-slate-700 outline-none focus:bg-slate-50 dark:focus:bg-slate-800"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MessageCircle, X } from "lucide-vue-next";

const isOpen = ref(false);
</script>

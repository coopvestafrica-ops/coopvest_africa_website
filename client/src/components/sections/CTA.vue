<template>
  <section class="py-16 bg-slate-900 dark:bg-slate-950 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold mb-4">Ready to start your journey?</h2>
        <p class="text-slate-300 mb-6">Join thousands of Africans building their financial future</p>
        <RouterLink
          to="/register"
          class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Get Started Today
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

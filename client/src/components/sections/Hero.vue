<template>
  <section class="py-20 sm:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-5xl sm:text-6xl font-bold mb-6">
          Smart Cooperative
          <span class="text-blue-600 dark:text-blue-400"> Investments</span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Empower your financial future with savings, loans, and investment opportunities
          designed for everyday Africans.
        </p>
        <div class="flex gap-4 justify-center">
          <RouterLink
            to="/register"
            class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Get Started
          </RouterLink>
          <a
            href="#features"
            class="px-8 py-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition font-medium"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <div class="flex-1 p-8">
      <h1 class="text-4xl font-bold mb-4">About Coopvest Africa</h1>
      <p class="text-lg text-slate-600 dark:text-slate-400 mb-6">
        Coopvest is building financial services for every African, starting with cooperative investment platforms.
      </p>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
</script>

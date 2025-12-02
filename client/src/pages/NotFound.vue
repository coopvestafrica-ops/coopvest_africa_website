<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <div class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <RouterLink to="/" class="text-blue-600 hover:underline">
          Go back home
        </RouterLink>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";
import { RouterLink } from "vue-router";
</script>

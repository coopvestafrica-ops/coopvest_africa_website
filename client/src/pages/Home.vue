<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
    <!-- Navigation -->
    <Navigation />

    <!-- Hero Section -->
    <Hero />

    <!-- Features Section -->
    <Features />

    <!-- Testimonials Section -->
    <Testimonials />

    <!-- FAQ Section -->
    <FAQ />

    <!-- CTA Section -->
    <CTA />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import Hero from "@/components/sections/Hero.vue";
import Features from "@/components/sections/Features.vue";
import Testimonials from "@/components/sections/Testimonials.vue";
import FAQ from "@/components/sections/FAQ.vue";
import CTA from "@/components/sections/CTA.vue";
import Footer from "@/components/Footer.vue";
</script>

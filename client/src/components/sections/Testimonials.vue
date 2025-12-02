<template>
  <section class="py-20 sm:py-32 bg-slate-50 dark:bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-bold text-center mb-12">What Our Members Say</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
          <p class="text-slate-600 dark:text-slate-400 mb-4">{{ testimonial.text }}</p>
          <p class="font-bold">{{ testimonial.author }}</p>
          <p class="text-sm text-slate-500">{{ testimonial.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    text: "Coopvest has transformed my financial life. I've been able to save more and access loans when I needed them.",
    author: "Sarah Okonkwo",
    role: "Small Business Owner",
  },
  {
    text: "The platform is so easy to use and transparent. I trust them with my money.",
    author: "Ahmed Hassan",
    role: "Software Engineer",
  },
  {
    text: "Finally, a financial service designed for African workers like me.",
    author: "Amara Johnson",
    role: "Healthcare Professional",
  },
];
</script>

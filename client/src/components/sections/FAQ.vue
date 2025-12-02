<template>
  <section id="faq" class="py-20 sm:py-32 bg-white dark:bg-slate-950">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div class="space-y-4">
        <details v-for="(faq, index) in faqs" :key="index" class="p-4 border border-slate-200 dark:border-slate-800 rounded-lg group">
          <summary class="font-bold cursor-pointer flex justify-between items-center">
            {{ faq.question }}
            <span class="group-open:rotate-180 transition">▼</span>
          </summary>
          <p class="mt-4 text-slate-600 dark:text-slate-400">{{ faq.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const faqs = [
  {
    question: "Is my money safe?",
    answer: "Yes, we use bank-level security and insurance to protect your funds.",
  },
  {
    question: "How do I get a loan?",
    answer: "Simply apply through your dashboard with basic KYC information and supporting documents.",
  },
  {
    question: "What are the interest rates?",
    answer: "Our rates are competitive and transparent. Check the rates page for current information.",
  },
];
</script>

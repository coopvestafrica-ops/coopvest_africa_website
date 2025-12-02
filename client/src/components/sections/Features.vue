<template>
  <section id="services" class="py-20 sm:py-32 bg-white dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Our Services
        </h2>
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Comprehensive financial solutions designed to meet all your savings, lending, and investment needs.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index" class="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg transition">
          <component :is="feature.icon" class="w-12 h-12 text-blue-600 mb-4" />
          <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
          <p class="text-slate-600 dark:text-slate-400">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Users, TrendingUp, BarChart3, Lock, Zap, Shield } from "lucide-vue-next";

const features = [
  {
    icon: Users,
    title: "Savings Pools",
    description: "Build your wealth through flexible, interest-bearing savings accounts with competitive rates.",
  },
  {
    icon: TrendingUp,
    title: "Smart Loans",
    description: "Access quick, affordable loans with transparent terms and flexible repayment schedules.",
  },
  {
    icon: BarChart3,
    title: "Investment Opportunities",
    description: "Grow your money through carefully curated investment pools and diversified portfolios.",
  },
  {
    icon: Lock,
    title: "Secure & Transparent",
    description: "Bank-level security with full transparency in all transactions and operations.",
  },
  {
    icon: Zap,
    title: "Instant Transactions",
    description: "Fast, seamless deposits, withdrawals, and transfers at your fingertips.",
  },
  {
    icon: Shield,
    title: "Member Protection",
    description: "Your funds are protected with comprehensive insurance and regulatory compliance.",
  },
];
</script>

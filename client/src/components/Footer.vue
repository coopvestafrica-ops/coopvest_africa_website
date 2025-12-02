<template>
  <footer class="bg-slate-900 dark:bg-slate-950 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="font-bold mb-4">{{ appTitle }}</h3>
          <p class="text-slate-400">Empowering Africans with financial services</p>
        </div>
        <div>
          <h4 class="font-bold mb-4">Company</h4>
          <ul class="space-y-2 text-slate-400">
            <li><RouterLink to="/about" class="hover:text-white">About</RouterLink></li>
            <li><a href="#" class="hover:text-white">Blog</a></li>
            <li><a href="#" class="hover:text-white">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Product</h4>
          <ul class="space-y-2 text-slate-400">
            <li><a href="#" class="hover:text-white">Savings</a></li>
            <li><a href="#" class="hover:text-white">Loans</a></li>
            <li><a href="#" class="hover:text-white">Investments</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Legal</h4>
          <ul class="space-y-2 text-slate-400">
            <li><a href="#" class="hover:text-white">Privacy</a></li>
            <li><a href="#" class="hover:text-white">Terms</a></li>
            <li><a href="#" class="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-slate-800 pt-8 text-center text-slate-400">
        <p>&copy; 2024 {{ appTitle }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { APP_TITLE } from "@/const";

const appTitle = APP_TITLE;
</script>

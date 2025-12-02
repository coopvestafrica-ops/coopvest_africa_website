<template>
  <!-- Skeleton card for stat cards -->
  <div
    v-if="type === 'stat-card'"
    class="bg-slate-200 dark:bg-slate-800 rounded-lg p-4 h-24 space-y-3 animate-pulse"
  >
    <div class="h-4 bg-slate-300 dark:bg-slate-700 rounded w-2/3"></div>
    <div class="h-8 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
  </div>

  <!-- Skeleton for table row -->
  <tr v-else-if="type === 'table-row'" class="border-b border-slate-200 dark:border-slate-700">
    <td
      v-for="i in (columns || 4)"
      :key="i"
      class="px-4 py-3"
    >
      <div class="h-4 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
    </td>
  </tr>

  <!-- Skeleton for list item -->
  <div
    v-else-if="type === 'list-item'"
    class="flex items-center gap-4 p-4 border-b border-slate-200 dark:border-slate-700 animate-pulse"
  >
    <div class="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-slate-300 dark:bg-slate-700 rounded w-2/3"></div>
      <div class="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
    </div>
  </div>

  <!-- Skeleton for text block -->
  <div
    v-else-if="type === 'text'"
    class="space-y-2 animate-pulse"
  >
    <div class="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
    <div class="h-4 bg-slate-300 dark:bg-slate-700 rounded w-4/5"></div>
    <div class="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/5"></div>
  </div>

  <!-- Skeleton for heading -->
  <div
    v-else-if="type === 'heading'"
    class="h-8 bg-slate-300 dark:bg-slate-700 rounded animate-pulse w-1/3"
  ></div>

  <!-- Skeleton for button -->
  <div
    v-else-if="type === 'button'"
    class="h-10 bg-slate-300 dark:bg-slate-700 rounded animate-pulse w-32"
  ></div>

  <!-- Default: circular spinner skeleton -->
  <div
    v-else
    class="inline-block w-6 h-6 border-3 border-slate-300 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin"
  ></div>
</template>

<script setup lang="ts">
defineProps<{
  type?: "stat-card" | "table-row" | "list-item" | "text" | "heading" | "button" | "spinner";
  columns?: number;
}>();
</script>

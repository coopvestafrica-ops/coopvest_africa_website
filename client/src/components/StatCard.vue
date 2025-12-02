<template>
  <div class="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">{{ title }}</p>
        <p class="text-3xl font-bold text-slate-900 dark:text-white">{{ value }}</p>
      </div>
      <component :is="getIcon(icon)" class="w-8 h-8 text-blue-600 opacity-80" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DollarSign,
  Briefcase,
  TrendingUp,
  CheckCircle,
  FileText,
  Users,
  BarChart3,
  PieChart,
} from "lucide-vue-next";

interface Props {
  title: string;
  value: string | number;
  icon?: "DollarSign" | "Briefcase" | "TrendingUp" | "CheckCircle" | "FileText" | "Users" | "BarChart3" | "PieChart";
}

const props = withDefaults(defineProps<Props>(), {
  icon: "TrendingUp",
});

const getIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    DollarSign,
    Briefcase,
    TrendingUp,
    CheckCircle,
    FileText,
    Users,
    BarChart3,
    PieChart,
  };
  return iconMap[iconName] || TrendingUp;
};
</script>

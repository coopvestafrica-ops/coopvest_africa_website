import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type Theme = "light" | "dark";

export const useThemeStore = defineStore("theme", () => {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const theme = ref<Theme>(getInitialTheme());

  const isDark = computed(() => theme.value === "dark");

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme.value);
    updateDOMTheme();
  };

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);
    updateDOMTheme();
  };

  const updateDOMTheme = () => {
    const root = document.documentElement;
    if (theme.value === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Initialize theme on store creation
  updateDOMTheme();

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
});

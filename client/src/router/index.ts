import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/_core/stores/authStore";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/pages/Home.vue"),
    name: "Home",
  },
  {
    path: "/about",
    component: () => import("@/pages/About.vue"),
    name: "About",
  },
  {
    path: "/login",
    component: () => import("@/pages/Login.vue"),
    name: "Login",
  },
  {
    path: "/register",
    component: () => import("@/pages/Register.vue"),
    name: "Register",
  },
  {
    path: "/dashboard",
    component: () => import("@/pages/MemberDashboard.vue"),
    name: "MemberDashboard",
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: () => import("@/pages/AdminDashboard.vue"),
    name: "AdminDashboard",
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/super-admin",
    component: () => import("@/pages/SuperAdminPanel.vue"),
    name: "SuperAdminPanel",
    meta: { requiresAuth: true, requiresSuperAdmin: true },
  },
  {
    path: "/kyc",
    component: () => import("@/pages/KYCVerification.vue"),
    name: "KYCVerification",
    meta: { requiresAuth: true },
  },
  {
    path: "/2fa",
    component: () => import("@/pages/TwoFASetup.vue"),
    name: "TwoFASetup",
    meta: { requiresAuth: true },
  },
  {
    path: "/password-reset",
    component: () => import("@/pages/PasswordReset.vue"),
    name: "PasswordReset",
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/NotFound.vue"),
    name: "NotFound",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Login", query: { redirect: to.fullPath } });
    return;
  }

  if (to.meta.requiresAdmin && authStore.user?.role !== "admin" && authStore.user?.role !== "super_admin") {
    next({ name: "Home" });
    return;
  }

  if (to.meta.requiresSuperAdmin && authStore.user?.role !== "super_admin") {
    next({ name: "Home" });
    return;
  }

  next();
});

export default router;

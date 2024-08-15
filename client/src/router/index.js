import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/components/stores";
const routes = [
  {
    path: "/",
    component: () => import("@/layout/login/Login.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/login/Login.vue"),
      },
    ],
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    component: () => import("@/layout/dashboard/Dashboard.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/dashboard/StatusPanel.vue"),
      },
      {
        path: "/dashboard/profile",
        component: () => import("@/views/dashboard/Profile.vue"),
      },
      {
        path: "/dashboard/accounts",
        component: () => import("@/views/dashboard/Accounts.vue"),
      },
      {
        path: "/dashboard/id-list",
        component: () => import("@/views/dashboard/IdList.vue"),
      },
      {
        path: "/dashboard/id-lost",
        component: () => import("@/views/dashboard/IdLost.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // Make sure routes are correctly defined as an array of objects
});
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  console.log(authStore.token);
  if (to.meta.requiresAuth && !authStore.token) {
    next("/");
  } else if (!to.meta.requiresAuth  && authStore.token) {
    next("/dashboard");
  } else {
    next();
  }
});
export default router;

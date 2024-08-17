import { defineStore } from "pinia";
import { useDashboardStateManagerStore } from "../dashboard/stateManager";
import { useAuthStore } from "../auth/auth";
import { login } from "@/components/api/Login.vue";
export const useLoginStore = defineStore("login", {
  state: () => ({
    email: "",
    password: "",
    mobile: "",
    role: [],
    isLoading: false,
  }),
  getters: {},
  actions: {
    clearLogin() {
      const dashboardStateManagerStore = useDashboardStateManagerStore();

      this.email = "";
      this.password = "";
      this.role = [];
      dashboardStateManagerStore.snackbar = false;
      dashboardStateManagerStore.snackbarMessage = "";
    },
    async handleLogin() {
      this.isLoading = true;
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      const authStore = useAuthStore();
      const body = {
        email: this.email,
        password: this.password,
        role: this.role.toLowerCase(),
      };

      try {
        const response = await login({ body });
        localStorage.setItem("token", response.token); // Store in localStorage
        authStore.token = response.token;
        this.router.push("/dashboard");
        
        setTimeout(() => {
          this.clearLogin();
        }, 500);
      } catch (error) {
        const errorMessage = error.response.data || "Something Error Occur";
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage = errorMessage;
        dashboardStateManagerStore.snackbarColor = "error";
       console.log(error)
      } finally {
        this.isLoading = false;
        setTimeout(() => {
          dashboardStateManagerStore.snackbar = false;
        }, 2000);
      }
    },
  },
});

import { auth } from "@/components/api/Auth.vue";
import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
  }),
  getters: {
    
  },
  actions: {
    async authentication() {
      this.isLoading = true;
      try {
        const response = await auth();
        if (response.token === this.token) {
          this.token = response.token;
          this.auth = response.user;
          console.log(this.auth);
        } else {
          this.clearAuth();
          this.router.push("/");
        }
      } catch (error) {
        console.log(error);
        this.clearAuth();
        this.router.push("/");
      } finally {
        this.isLoading = false;
      }
    },
    clearAuth() {
      localStorage.removeItem("token");
      this.token = null;
    },
  },
});

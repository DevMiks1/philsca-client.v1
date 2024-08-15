import { auth } from "@/components/api/Auth.vue";
import { defineStore } from "pinia";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {},
  actions: {
    async authentication() {
      try {
        const response = await auth();
        if (response.token === this.token) {
          this.token = response.token;
          this.auth = response.user.user;
          console.log(this.auth);
        } else {
          this.clearAuth();
          console.log("asda");
          this.router.push("/");
        }
      } catch (error) {
        console.log(error);
        this.clearAuth();
          console.log("asda");
          this.router.push("/");
      }
    },
    clearAuth() {
      localStorage.removeItem("token");
      this.token = null;
    },
  },
});

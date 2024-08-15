import { defineStore } from "pinia";
import { logout } from "@/components/api/Logout.vue";
import { useAuthStore } from "../auth/auth";

export const useLogoutStore = defineStore("logout", {
  state: () => ({
    
  }),
  getters: {},
  actions: {
    async handleLogout() {
      const authStore = useAuthStore()
      try {
        const response = await logout();
      
        localStorage.removeItem("token");
        authStore.token = null;
        this.router.push("/");
        
      } catch (error) {
        console.log(error);
      } 
    },
  },
});

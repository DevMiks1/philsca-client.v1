import { defineStore } from "pinia";
import { capitalizeFirstLetter } from "@/components/utility/capitalizeFirstLetter";
import { useAuthStore } from "@/components/stores/index";
export const useRetrieveStaffStore = defineStore("staff", {
  state: () => ({
    staffs: [],
    search: "",
  }),
  getters: {
    displayStaffTable() {
      const authStore = useAuthStore();
      const loggedInUserId = authStore.auth?._id;

      return this.staffs
        .filter((staff) => staff._id !== loggedInUserId).filter((staff) => staff.role === 'staff') 
        .map((staff) => {
          const suffix = staff.suffix
            ? ` ${capitalizeFirstLetter(staff.suffix)}`
            : "";
          return {
            ...staff,
            fullName: `${capitalizeFirstLetter(staff.firstName)} ${capitalizeFirstLetter(staff.middleName)} ${capitalizeFirstLetter(staff.lastName)} ${suffix}`,
          };
        });
    },
  },

  actions: {
    async retrieveAllStaffs() {
      try {
        const response = await retrieveAllAccount();
        this.staffs = response;
        
      } catch (error) {
        console.log(error);
      }
    },
  },
});

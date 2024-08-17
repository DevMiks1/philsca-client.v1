import { defineStore } from "pinia";
// utility
import { capitalizeFirstLetter } from "@/components/utility/capitalizeFirstLetter";
// store
import { useAuthStore } from "@/components/stores/index";
// api
import { retrieveAllStaff } from "@/components/api/accounts/Staff.vue";
export const useRetrieveStaffStore = defineStore("staff", {
  state: () => ({
    staffs: [],
    search: "",
  }),
  getters: {
    displayStaffTable() {
      return this.staffs.map((staff) => {
        const personnelDetails = staff.personnelDetailsId
        const personalInfo = staff.userDetailsId?.personalInfoId || {};
        const userAccount = staff.userDetailsId?.userAccountId || {};
        const schoolId = userAccount.roleDetailsId?.schoolId || "";
        const suffix = personalInfo?.suffix
          ? ` ${capitalizeFirstLetter(personalInfo?.suffix)}`
          : "";
        return {
          ...staff,
          position: personnelDetails.position,
          schoolId: schoolId,
          fullName: `${capitalizeFirstLetter(personalInfo?.firstName)} ${capitalizeFirstLetter(personalInfo?.middleName)} ${capitalizeFirstLetter(personalInfo?.lastName)} ${suffix}`,
        };
      });
    },
  },

  actions: {
    async retrieveAllStaffs() {
      try {
        const response = await retrieveAllStaff();
        this.staffs = response.data;
       
      } catch (error) {
        console.log(error);
      }
    },
  },
});

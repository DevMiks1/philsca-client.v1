import { defineStore } from "pinia";
// utility
import { capitalizeFirstLetter } from "@/components/utility/capitalizeFirstLetter";
// store
import { useAuthStore } from "@/components/stores/index";
// api
import { retrieveAllFaculty } from "@/components/api/accounts/Faculty.vue";

export const useRetrieveFacultyStore = defineStore("retrieve-faculty", {
  state: () => ({
    faculties: [],
    search: "",
  }),
  getters: {
    displayFacultyTable() {
      return this.faculties.map((faculty) => {
        const personnelDetails = faculty.personnelDetailsId
        const personalInfo = faculty.userDetailsId?.personalInfoId || {};
        const userAccount = faculty.userDetailsId?.userAccountId || {};
        const schoolId = userAccount.roleDetailsId?.schoolId || "";
        const suffix = personalInfo?.suffix
          ? ` ${capitalizeFirstLetter(personalInfo?.suffix)}`
          : "";
        return {
          ...faculty,
          position: `${capitalizeFirstLetter(personnelDetails.position)}`,
          schoolId: schoolId,

          fullName: `${capitalizeFirstLetter(personalInfo?.firstName)} ${capitalizeFirstLetter(personalInfo?.middleName)} ${capitalizeFirstLetter(personalInfo?.lastName)} ${suffix}`,
        };
      });
    },
  },

  actions: {
    async retrieveAllFaculty() {
      try {
        const response = await retrieveAllFaculty();
        this.faculties = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

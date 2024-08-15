import { defineStore } from "pinia";
import { capitalizeFirstLetter } from "@/components/utility/capitalizeFirstLetter";
import { useAuthStore } from "@/components/stores/index";
export const useRetrieveFacultyStore = defineStore("retrieve-faculty", {
  state: () => ({
    faculties: [],
    search: "",
  }),
  getters: {
    displayFacultyTable() {
      const authStore = useAuthStore();
      const loggedInUserId = authStore.auth?._id;

      return this.faculties
        .filter((faculty) => faculty._id !== loggedInUserId).filter((faculty) => faculty.role === 'faculty') 
        .map((faculty) => {
          const suffix = faculty.suffix
            ? ` ${capitalizeFirstLetter(faculty.suffix)}`
            : "";
          return {
            ...faculty,
            fullName: `${capitalizeFirstLetter(faculty.firstName)} ${capitalizeFirstLetter(faculty.middleName)} ${capitalizeFirstLetter(faculty.lastName)} ${suffix}`,
          };
        });
    },
  },

  actions: {
    async retrieveAllFaculty() {
      try {
        const response = await retrieveAllAccount();
        this.faculties = response;
        
      } catch (error) {
        console.log(error);
      }
    },
  },
});

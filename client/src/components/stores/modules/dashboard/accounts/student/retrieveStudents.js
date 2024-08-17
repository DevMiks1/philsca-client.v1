import { defineStore } from "pinia";
import { capitalizeFirstLetter } from "@/components/utility/capitalizeFirstLetter";
import { useAuthStore } from "@/components/stores/index";
import { retrieveAllStudent } from "@/components/api/accounts/Student.vue";
export const useRetrieveStudentStore = defineStore("student", {
  state: () => ({
    students: [],
    search: "",
  }),
  getters: {
    displayStudentTable() {
      return this.students.map((student) => {
        const personalInfo = student.userDetailsId?.personalInfoId || {};
        const userAccount = student.userDetailsId?.userAccountId || {};
        const schoolId = userAccount?.roleDetailsId?.schoolId || "";
        const suffix = personalInfo?.suffix
          ? ` ${capitalizeFirstLetter(personalInfo?.suffix)}`
          : "";
        return {
          ...student,
          schoolId: schoolId,
          fullName: `${capitalizeFirstLetter(personalInfo?.firstName)} ${capitalizeFirstLetter(personalInfo?.middleName)} ${capitalizeFirstLetter(personalInfo?.lastName)}${suffix}`,
        };
      });
    },
  },

  actions: {
    async retrieveAllStudents() {
      try {
        const response = await retrieveAllStudent();
        this.students = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

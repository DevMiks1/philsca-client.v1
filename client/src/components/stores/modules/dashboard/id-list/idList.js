// src/store/modules/riders.js

import { defineStore } from "pinia";
// store
import {
  useRetrieveStudentStore,
  useDashboardStateManagerStore,
} from "@/components/stores/index";
// utility
import { capitalizeFirstLetter } from "@/components/utility/capitalizeFirstLetter";
// api
import { updateStudent } from "@/components/api/accounts/Student.vue";
// store
export const useIdListStore = defineStore("id-lit", {
  state: () => ({
    status: "issued",
    isApprovedModalOpen: false,
    idToApproved: "",
    isLoading: false,
  }),
  getters: {
    issuedStudent() {
      const retrieveStudentStore = useRetrieveStudentStore();
      return retrieveStudentStore.students
        .filter((student) => student.isIdIssued)
        .map((student) => {
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
    notIssuedStudent() {
      const retrieveStudentStore = useRetrieveStudentStore();
      return retrieveStudentStore.students
        .filter((student) => !student.isIdIssued) 
        .map((student) => {
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
    toggleAprroved({ isModalOpen, id }) {
      console.log(isModalOpen);
      console.log(id);
      this.isApprovedModalOpen = isModalOpen;
      this.idToApproved = id;
    },
    async handleIssuedId() {
      const retrieveStudentStore = useRetrieveStudentStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();

      this.isLoading = true
      try {
        const body = {
          isIdIssued: true,
        };
        const response = await updateStudent({ id: this.idToApproved, body });
        if (response) {
          retrieveStudentStore.students = response.data;
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Issued ID"
          dashboardStateManagerStore.snackbarColor = "success";
          this.isApprovedModalOpen = false
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage = errorMessage;
        dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false
        setTimeout(() => {
          dashboardStateManagerStore.snackbar = false;

        }, 2000)
      }
    },
  },
});

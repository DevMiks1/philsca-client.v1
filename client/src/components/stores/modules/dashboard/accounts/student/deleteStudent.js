// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import { deleteStudent } from "@/components/api/accounts/Student.vue";
// store
import {
  useDashboardStateManagerStore,
  useRetrieveStudentStore,
} from "@/components/stores/index";
export const useDeleteStudentStore = defineStore("delete-student", {
  state: () => ({
    isDeleteStudentModalOpen: false,
    idToDelete: "",
    password: "",
    showPassword: false,
  }),
  getters: {
    passwordCheckingRules() {
      const retrieveStudentStore = useRetrieveStudentStore();
      const userToDelete = retrieveStudentStore.students.find(
        (acc) => acc._id === this.idToDelete,
      );
      const userPassword = userToDelete?.userDetailsId?.userAccountId?.password
      const password = userPassword || "";

      return [
        (value) => {
          const trimmedValue = value.trim();
          return !!trimmedValue || "Password must not be empty.";
        },
        (value) => {
          const trimmedValue = value.trim();
          return trimmedValue === password || "Password does not match.";
        },
      ];
    },
  },

  actions: {
    // function to open edit modal
    handleToggleDeleteStudentModal({ isModalOpen, id }) {
      this.isDeleteStudentModalOpen = isModalOpen;
      this.idToDelete = id;
   
    },
    handleCloseDeleteStudentModal(value) {
      this.isDeleteStudentModalOpen = value;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleDeleteStudent() {
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      const retrieveStudentStore = useRetrieveStudentStore();
      this.isLoading = true;
      try {
        const response = await deleteStudent({
          id: this.idToDelete,
        });
        if (response) {
          const updatedStudentsAfterDelete =
            retrieveStudentStore.students.filter(
              (acc) => acc._id !== this.idToDelete,
            );
          retrieveStudentStore.students = updatedStudentsAfterDelete;
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Deleted Student";
          dashboardStateManagerStore.snackbarColor = "green";
          this.password = "";
          this.isDeleteStudentModalOpen = false;
        }
      } catch (error) {
        const errorMessage =
        error.response.data.message || "Something Error Occur";
      dashboardStateManagerStore.snackbar = true;
      dashboardStateManagerStore.snackbarMessage = errorMessage;
      dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false;
        setTimeout(() => {
          dashboardStateManagerStore.snackbar = false;
        }, 2000)
      }
    },
  },
});

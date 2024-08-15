// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import { deleteAccount } from "@/components/api/Accounts.vue";
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
      const userPassword = userToDelete ? userToDelete.password : "";

      return [
        (value) => {
          const trimmedValue = value.trim();
          return !!trimmedValue || "Password must not be empty.";
        },
        (value) => {
          const trimmedValue = value.trim();
          return trimmedValue === userPassword || "Password does not match.";
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
        const response = await deleteAccount({
          id: this.idToDelete,
        });
        if (response) {
          const updatedStudentsAfterDelete =
            retrieveStudentStore.students.filter(
              (acc) => acc._id !== this.idToDelete,
            );
          // console.log(updatedStudentsAfterDelete);
          retrieveStudentStore.students = updatedStudentsAfterDelete;
          // console.log(retrieveStudentStore.students);
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Deleted Student";
          dashboardStateManagerStore.snackbarColor = "green";
          this.password = "";
          this.isDeleteStudentModalOpen = false;
        }
      } catch (error) {
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage =
          "An error occured while deleting student";
        dashboardStateManagerStore.snackbarColor = "red";
      } finally {
        this.isLoading = false;
      }
    },
  },
});

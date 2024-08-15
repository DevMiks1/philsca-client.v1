// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import { deleteAccount } from "@/components/api/Accounts.vue";
// store
import {
  useDashboardStateManagerStore,
  useRetrieveFacultyStore,
} from "@/components/stores/index";
export const useDeleteFacultyStore = defineStore("delete-faculty", {
  state: () => ({
    isDeleteFacultyModalOpen: false,
    idToDelete: "",
    password: "",
    showPassword: false,
  }),
  getters: {
    passwordCheckingRules() {
      const retrieveFacultyStore = useRetrieveFacultyStore();
      const userToDelete = retrieveFacultyStore.faculties.find(
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
    handleToggleDeleteFacultyModal({ isModalOpen, id }) {
      this.isDeleteFacultyModalOpen = isModalOpen;
      this.idToDelete = id;
    },
    handleCloseDeleteFacultyModal(value) {
      this.isDeleteFacultyModalOpen = value;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleDeleteFaculty() {
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      const retrieveFacultyStore = useRetrieveFacultyStore();
      this.isLoading = true;
      try {
        const response = await deleteAccount({
          id: this.idToDelete,
        });
        if (response) {
          const updatedFacultyAfterDelete =
            retrieveFacultyStore.faculties.filter(
              (acc) => acc._id !== this.idToDelete,
            );
          retrieveFacultyStore.faculties = updatedFacultyAfterDelete;
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Deleted Faculty";
          dashboardStateManagerStore.snackbarColor = "success";
          this.password = "";
          this.isDeleteFacultyModalOpen = false;
        }
      } catch (error) {
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage =
          "An error occured while deleting faculty";
        dashboardStateManagerStore.snackbarColor = "red";
      } finally {
        this.isLoading = false;
        setTimeout(() => {
            dashboardStateManagerStore.snackbar = false
        }, 2000)
      }
    },
  },
});

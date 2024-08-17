// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import { deleteStaff } from "@/components/api/accounts/Staff.vue";
// store
import {
  useDashboardStateManagerStore,
  useRetrieveStaffStore,
} from "@/components/stores/index";
export const useDeleteStaffStore = defineStore("staff-Staff", {
  state: () => ({
    isDeleteStaffModalOpen: false,
    idToDelete: "",
    password: "",
    showPassword: false,
  }),
  getters: {
    passwordCheckingRules() {
      const retrieveStaffStore = useRetrieveStaffStore();
      const userToDelete = retrieveStaffStore.staffs.find(
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
    handleToggleDeleteStaffModal({ isModalOpen, id }) {
      this.isDeleteStaffModalOpen = isModalOpen;
      this.idToDelete = id;
    },
    handleCloseDeleteStaffModal(value) {
      this.isDeleteStaffModalOpen = value;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleDeleteStaff() {
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      const retrieveStaffStore = useRetrieveStaffStore();
      this.isLoading = true;
      try {
        const response = await deleteStaff({
          id: this.idToDelete,
        });
        if (response) {
          const updatedStaffsAfterDelete = retrieveStaffStore.staffs.filter(
            (acc) => acc._id !== this.idToDelete,
          );
          retrieveStaffStore.staffs = updatedStaffsAfterDelete;
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Deleted Staff";
          dashboardStateManagerStore.snackbarColor = "green";
          this.password = "";
          this.isDeleteStaffModalOpen = false;
        }
      } catch (error) {
        const errorMessage =
          error.response.data.message || "Something Error Occur";
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage = errorMessage;
        dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false;
      }
    },
  },
});

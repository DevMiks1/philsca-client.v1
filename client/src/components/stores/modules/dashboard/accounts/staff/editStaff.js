// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import {
  useDashboardStateManagerStore,
  useRetrieveStaffStore,
} from "@/components/stores/index";
import { updateAccount } from "@/components/api/Accounts.vue";
export const useEditStaffStore = defineStore("edit-Staff", {
  state: () => ({
    isEditStaffModalOpen: false,
    idToEdit: "",
    isLoading: false,

    firstName: "",
    lastName: "",
    suffix: "",
    middleName: "",
    birthDate: "",
    position: "",
    designation: "",
    hgt: "",
    wgt: "",
    sss: "",
    tin: "",

    address: "",
    contactNumber: "",
    contactPerson: "",
  }),
  getters: {
    editStaff() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        suffix: this.suffix,
        middleName: this.middleName,
        birthDate: this.birthDate,
        address: this.address,
        contactNumber: `+63${this.contactNumber}`,
        contactPerson: `+63${this.contactPerson}`,
        position: this.position,
        designation: this.designation,
        hgt: this.hgt,
        wgt: this.wgt,
        sss: this.sss,
        tin: this.tin,
      };
    },
  },
  actions: {
    clearStaff() {
      this.idToEdit = null;
      this.firstName = "";
      this.lastName = "";
      this.suffix = "";
      this.middleName = "";
      this.birthDate = "";
      this.address = "";
      this.contactNumber = "";
      this.contactPerson = "";
      this.position = "";
      this.designation = "";
      this.hgt = "";
      this.wgt = "";
      this.sss = "";
      this.tin = "";
    },
    // function to open edit modal
    handleToggleEditStaffModal({ isModalOpen, id }) {
      this.isEditStaffModalOpen = isModalOpen;
      if (!isModalOpen) {
        // Reset fields when closing the modal

        this.clearStaff;
      } else {
        // Set the idToEdit when opening the modal
        console.log(id);
        this.idToEdit = id;
      }
    },
    handleCloseEditStaffModal(value) {
      this.isEditStaffModalOpen = value;
    },
    async handleEditStaff() {
      const retrieveStaffStore = useRetrieveStaffStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      this.isLoading = true;
      try {
        const StaffContactNumber = retrieveStaffStore.staffs
          .filter((acc) => acc._id !== this.idToEdit)
          .map((acc) => acc.contactNumber);

        const existingContactNumber = StaffContactNumber.includes(
          this.editStaff.contactNumber,
        );
        if (existingContactNumber) {
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "contact number is already exist";
          dashboardStateManagerStore.snackbarColor = "red";
        } else {
          const response = await updateAccount({
            id: this.idToEdit,
            body: this.editStaff,
          });
          if (response) {
            const updatedStaffs = retrieveStaffStore.staffs.map((acc) =>
              acc._id === this.idToEdit ? { ...acc, ...this.editStaff } : acc,
            );

            retrieveStaffStore.staffs = updatedStaffs;
            dashboardStateManagerStore.snackbar = true;
            dashboardStateManagerStore.snackbarMessage =
              "Successfully Edited Staff";
            dashboardStateManagerStore.snackbarColor = "success";
            this.isEditStaffModalOpen = false;
          }
        }
      } catch (error) {
        console.error("Error editing staff:", error);
        dashboardStateManagerStore.snackbar = true;
            dashboardStateManagerStore.snackbarMessage =
              "Error editing staff";
            dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false;
      }
    },
  },
});

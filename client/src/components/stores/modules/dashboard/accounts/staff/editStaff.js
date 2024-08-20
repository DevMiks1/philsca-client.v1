// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import { updateStaff } from "@/components/api/accounts/Staff.vue";
// store
import {
  useDashboardStateManagerStore,
  useRetrieveStaffStore,
} from "@/components/stores/index";
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
    picture: '',
    contactNumber: "",
    contactPersonNumber: "",
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
        contactPerson: this.contactPerson,
        contactPersonNumber: `+63${this.contactPersonNumber}`,
        position: this.position,
        designation: this.designation,
        picture: this.picture,
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
      this.contactPersonNumber = "";
      this.position = "";
      this.designation = "";
      this.picture = '';
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
        const response = await updateStaff({
          id: this.idToEdit,
          body: this.editStaff,
        });
        if (response) {
          const updatedStaffs = retrieveStaffStore.staffs.map((acc) =>
            acc._id === this.idToEdit ? response.data : acc,
          );

          retrieveStaffStore.staffs = updatedStaffs;
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Edited Staff";
          dashboardStateManagerStore.snackbarColor = "success";
          this.isEditStaffModalOpen = false;
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

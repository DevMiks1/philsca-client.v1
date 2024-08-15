// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import {
  useDashboardStateManagerStore,
  useRetrieveFacultyStore,
} from "@/components/stores/index";
import { updateAccount } from "@/components/api/Accounts.vue";
export const useEditFacultyStore = defineStore("edit-faculty", {
  state: () => ({
    isEditFacultyModalOpen: false,
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
    editFaculty() {
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
    clearFaculty() {
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
    handleToggleEditFacultyModal({ isModalOpen, id }) {
      this.isEditFacultyModalOpen = isModalOpen;
      if (!isModalOpen) {
        // Reset fields when closing the modal

        this.clearFaculty;
      } else {
        // Set the idToEdit when opening the modal
        this.idToEdit = id;
      }
    },
    handleCloseEditFacultyModal(value) {
      this.isEditFacultyModalOpen = value;
    },
    async handleEditFaculty() {
      const retrieveFacultyStore = useRetrieveFacultyStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      this.isLoading = true;
      try {
        const FacultyContactNumber = retrieveFacultyStore.faculties
          .filter((acc) => acc._id !== this.idToEdit)
          .map((acc) => acc.contactNumber);

        const existingContactNumber = FacultyContactNumber.includes(
          this.editFaculty.contactNumber,
        );
        if (existingContactNumber) {
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "contact number is already exist";
          dashboardStateManagerStore.snackbarColor = "red";
        } else {
          const response = await updateAccount({
            id: this.idToEdit,
            body: this.editFaculty,
          });
          if (response) {
            const updatedFaculty = retrieveFacultyStore.faculties.map((acc) =>
              acc._id === this.idToEdit ? { ...acc, ...this.editFaculty } : acc,
            );

            retrieveFacultyStore.faculties = updatedFaculty;
            dashboardStateManagerStore.snackbar = true;
            dashboardStateManagerStore.snackbarMessage =
              "Successfully Edited Faculty";
            dashboardStateManagerStore.snackbarColor = "green";
            this.isEditStaffModalOpen = false;
          }
        }
      } catch (error) {
        console.error("Error editing faculty:", error);
        dashboardStateManagerStore.snackbar = true;
            dashboardStateManagerStore.snackbarMessage =
              "Error Editing faculty";
            dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false;
      }
    },
  },
});

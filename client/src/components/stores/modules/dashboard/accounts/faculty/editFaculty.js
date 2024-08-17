// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import { updateFaculty } from "@/components/api/accounts/Faculty.vue";
// store
import {
  useDashboardStateManagerStore,
  useRetrieveFacultyStore,
} from "@/components/stores/index";
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
    contactPersonNumber: "",
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
        contactPerson: this.contactPerson,
        contactPersonNumber: `+63${this.contactPersonNumber}`,
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
   
          const response = await updateFaculty({
            id: this.idToEdit,
            body: this.editFaculty,
          });
          if (response) {
            const updatedFaculty = retrieveFacultyStore.faculties.map((acc) =>
              acc._id === this.idToEdit ? response.data : acc,
            );

            retrieveFacultyStore.faculties = updatedFaculty;
            dashboardStateManagerStore.snackbar = true;
            dashboardStateManagerStore.snackbarMessage =
              "Successfully Edited Faculty";
            dashboardStateManagerStore.snackbarColor = "success";
            this.isEditFacultyModalOpen = false;
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

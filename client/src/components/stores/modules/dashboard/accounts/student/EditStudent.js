// src/store/modules/riders.js

import { defineStore } from "pinia";
// store
import {
  useDashboardStateManagerStore,
  useRetrieveStudentStore,
} from "@/components/stores/index";
// api
import { updateStudent } from "@/components/api/accounts/Student.vue";
export const useEditStudentStore = defineStore("edit-student", {
  state: () => ({
    isEditStudentModalOpen: false,
    idToEdit: "",
    isLoading: false,

    firstName: "",
    lastName: "",
    suffix: "",
    middleName: "",
    birthDate: "",
    course: "",
    schoolYear: "",
    address: "",
    picture: "",
    contactNumber: "",
    contactPerson: "",
    contactPersonNumber: "",
  }),
  getters: {
    editStudent() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        suffix: this.suffix,
        middleName: this.middleName,
        course: this.course,
        birthDate: this.birthDate,
        schoolYear: this.schoolYear,
        address: this.address,
        picture: this.picture,
        contactNumber: `+63${this.contactNumber}`,
        contactPerson: this.contactPerson,
        contactPersonNumber: `+63${this.contactPersonNumber}`,
      };
    },
  },
  actions: {
    clearStudent() {
      this.idToEdit = null;
      this.firstName = "";
      this.lastName = "";
      this.suffix = "";
      this.middleName = "";
      this.birthDate = "";
      this.course = "";
      this.schoolYear = "";
      this.address = "";
      this.picture = '';
      this.contactNumber = "";
      this.contactPerson = "";
      this.contactPersonNumber = "";
    },
    // function to open edit modal
    handleToggleEditStudentModal({ isModalOpen, id }) {
      this.isEditStudentModalOpen = isModalOpen;
      if (!isModalOpen) {
        // Reset fields when closing the modal

        this.clearStudent;
      } else {
        // Set the idToEdit when opening the modal
        console.log(id);
        this.idToEdit = id;
      }
    },
    handleCloseEditStudentModal(value) {
      this.isEditStudentModalOpen = value;
    },
    async handleEditEmployee() {
      const retrieveStudentStore = useRetrieveStudentStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      this.isLoading = true;
      try {
        const response = await updateStudent({
          id: this.idToEdit,
          body: this.editStudent,
        });

        if (response) {
          const updatedStudents = retrieveStudentStore.students.map((acc) =>
            acc._id === this.idToEdit ? response.data : acc,
          );
          console.log(updatedStudents, "updated");
          retrieveStudentStore.students = updatedStudents;
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Edited Employee";
          dashboardStateManagerStore.snackbarColor = "green";
          this.isEditStudentModalOpen = false;
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
        }, 2000);
      }
    },
  },
});

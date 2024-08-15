// src/store/modules/riders.js

import { defineStore } from "pinia";
// api
import {  useDashboardStateManagerStore, useRetrieveStudentStore} from '@/components/stores/index'
import { updateAccount } from "@/components/api/Accounts.vue";
export const useEditStudentStore = defineStore("edit-student", {
  state: () => ({
    isEditStudentModalOpen: false,
    idToEdit: "",
    idToEditNumber:null,
    isLoading: false,
    
    firstName: "",
    lastName: "",
    suffix: "",
    middleName: "",
    birthDate:"",
    course: "",
    schoolYear: "",
    semesterType: "",
    address: "",
    contactNumber: "",
    contactPerson:''
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
        semesterType: this.semesterType,
        address: this.address,
        contactNumber: `+63${this.contactNumber}`,
        contactPerson: `+63${this.contactPerson}`
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
      this.semesterType = "";
      this.address = "";
      this.contactNumber = "";
      this.contactPerson = "";
    },
    // function to open edit modal
    handleToggleEditStudentModal({ isModalOpen, id }) {
      this.isEditStudentModalOpen = isModalOpen;
      if (!isModalOpen) {
        // Reset fields when closing the modal

        this.clearStudent
      } else {
        // Set the idToEdit when opening the modal
        console.log(id);
        this.idToEdit = id;
        this.idToEditNumber = id
      }
    },
    handleCloseEditStudentModal(value){
      this.isEditStudentModalOpen = value;

    },
    async handleEditEmployee() {
      const retrieveStudentStore = useRetrieveStudentStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      this.isLoading = true;
      try {
       
        const studentContactNumber = retrieveStudentStore.students
          .filter((acc) => acc._id !== this.idToEdit)
          .map((acc) => acc.contactNumber);
        
        const existingContactNumber = studentContactNumber.includes(this.editStudent.contactNumber);
        if (existingContactNumber) {
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage = "contact number is already exist";
          dashboardStateManagerStore.snackbarColor = "red";
        } else {
          
          const response = await updateAccount({
            id: this.idToEdit, 
            body: this.editStudent,
         
          });
          if (response) {
            const updatedStudents = retrieveStudentStore.students.map((acc) =>
              acc._id === this.idToEdit
                ? { ...acc, ...this.editStudent }
                : acc,
            );

            retrieveStudentStore.students = updatedStudents;
            dashboardStateManagerStore.snackbar = true;
            dashboardStateManagerStore.snackbarMessage = "Successfully Edited Employee";
            dashboardStateManagerStore.snackbarColor = "green";
            this.isEditStudentModalOpen = false;
          }
        }
      } catch (error) {
        console.error("Error editing employee:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

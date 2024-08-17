// src/store/modules/riders.js

import { defineStore } from "pinia";
// store
import { useRetrieveStudentStore } from "@/components/stores/index";
export const useViewStudentStore = defineStore("view-student", {
  state: () => ({
    isViewStudentModalOpen: false,
    idToView: "",
  }),
  getters: {
    viewStudentDetails() {
      const retrieveStudentStore = useRetrieveStudentStore();
      const student = retrieveStudentStore.students.find(
        (student) => student._id === this.idToView,
      );
      const personalInfo = student.userDetailsId?.personalInfoId;

      if (student) {
        // Create a new Date object from the ISO string
        const parsedDate = new Date(personalInfo.birthDate);

        // Verify if the date is valid
        if (!isNaN(parsedDate.getTime())) {
          // Format the date to a readable string
          personalInfo.birthDate = parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        } else {
          personalInfo.birthDate = "Invalid date";
        }
      } else {
        personalInfo.birthDate = "EMPTY";
      }

      return student;
    },
  },

  actions: {
    // function to open edit modal
    toggleViewStudentModal({ isModalOpen, id }) {
      this.isViewStudentModalOpen = isModalOpen;
      this.idToView = id;

      if (isModalOpen) {
        this.viewStudentDetails;
      }
    },
  },
});

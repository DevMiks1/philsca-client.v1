// src/store/modules/riders.js

import { defineStore } from "pinia";
// store
import { useRetrieveFacultyStore } from "@/components/stores/index";
export const useViewFacultyStore = defineStore("view-faculty", {
  state: () => ({
    isViewFacultyModalOpen: false,
    idToView: "",
  }),
  getters: {
    viewFacultyDetails() {
      const retrieveFacultyStore = useRetrieveFacultyStore();
      const faculty = retrieveFacultyStore.faculties.find(
        (faculty) => faculty._id === this.idToView,
      );

      if (faculty && faculty.birthDate) {
        // Create a new Date object from the ISO string
        const parsedDate = new Date(faculty.birthDate);

        // Verify if the date is valid
        if (!isNaN(parsedDate.getTime())) {
          // Format the date to a readable string
          faculty.formattedBirthDate = parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        } else {
          faculty.formattedBirthDate = "Invalid date";
        }
      } else {
        faculty.formattedBirthDate = "EMPTY";
      }

      return faculty;
    },
  },

  actions: {
    // function to open edit modal
    toggleViewFacultyModal({ isModalOpen, id }) {
      this.isViewFacultyModalOpen = isModalOpen;
      this.idToView = id;
    },
  },
});

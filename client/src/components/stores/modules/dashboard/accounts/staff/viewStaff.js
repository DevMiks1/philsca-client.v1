// src/store/modules/riders.js

import { defineStore } from "pinia";
// store
import { useRetrieveStaffStore } from "@/components/stores/index";
export const useViewStaffStore = defineStore("view-Staff", {
  state: () => ({
    isViewStaffModalOpen: false,
    idToView: "",
  }),
  getters: {
    viewStaffDetails() {
      const retrieveStaffStore = useRetrieveStaffStore();
      const staff = retrieveStaffStore.staffs.find(
        (staff) => staff._id === this.idToView,
      );
      const personalInfo = staff.userDetailsId?.personalInfoId

      if (staff) {
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
      

      return staff;
    },
  },

  actions: {
    // function to open edit modal
    toggleViewStaffModal({ isModalOpen, id }) {
      this.isViewStaffModalOpen = isModalOpen;
      this.idToView = id;

      if(isModalOpen) {
        this.viewStaffDetails
      }
    },
  },
});

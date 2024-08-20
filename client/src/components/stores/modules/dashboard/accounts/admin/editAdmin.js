// src/store/modules/riders.js

import { defineStore } from "pinia";
// store
import {
  useDashboardStateManagerStore,
  useRetrieveStudentStore,
} from "@/components/stores/index";
// api
import { updateStudent } from "@/components/api/accounts/Student.vue";
export const useEditAdminStore = defineStore("edit-admin", {
  state: () => ({
    firstName: "",
    lastName: "",
    suffix: "",
    middleName: "",
    birthDate: "",
    address: "",
    contactNumber: "",
    contactPerson: "",
    contactPersonNumber: "",
    picture: '',
  }),
  getters: {
    editAdmin() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        suffix: this.suffix,
        middleName: this.middleName,
        birthDate: this.birthDate,
        address: this.address,
        picture: this.picture,
        contactNumber: `+63${this.contactNumber}`,
        contactPerson: this.contactPerson,
        contactPersonNumber: `+63${this.contactPersonNumber}`,
      };
    },
  },
  actions: {
    clearAdmin() {
      this.firstName = "";
      this.lastName = "";
      this.suffix = "";
      this.middleName = "";
      this.birthDate = "";
      this.address = "";
      this.picture = '';
      this.contactNumber = "";
      this.contactPerson = "";
      this.contactPersonNumber = "";
    },
    
  },
});

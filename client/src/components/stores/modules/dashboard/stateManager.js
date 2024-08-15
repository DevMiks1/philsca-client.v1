// src/store/modules/riders.js

import { defineStore } from "pinia";

export const useDashboardStateManagerStore = defineStore("state-manager", {
  state: () => ({
    snackbar: false,
    snackbarMessage: "",
    snackbarColor: "",
    timeout: 2000,
  }),
  getters: {
    

    
  },

  actions: {},
});

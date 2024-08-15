// src/store/modules/riders.js

import { defineStore } from "pinia";

export const useLoginStateManagerStore = defineStore("login-state-manager", {
  state: () => ({}),
  getters: {
    passwordRules() {
      return [
        (value) => !!value || "Password must not be empty.",
        (value) =>
          value.length >= 4 || "Password must be at least 4 characters long.",
      ];
    },
    

    emailRules() {
      return [
        (value) => !!value || "Email is required.",
        (value) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email format.",
      ];
    },
  },

  actions: {},
});

// src/store/modules/riders.js

import { defineStore } from "pinia";

export const useAccountStateManagerStore = defineStore(
  "account-state-manager",
  {
    state: () => ({}),
    getters: {
      contactNumberRules() {
        return [
          (value) => value.trim() !== "" || "Contact Number must not be empty",
          (value) =>
            /^[0-9]{10}$/.test(value) ||
            " must be 10 digits and numbers only.",
          (value) =>
            value.startsWith("9") ||
            "Contact number must start with the digit 9.",
        ];
      },
      schoolIdRules() {
        return [
          (value) => {
            const trimmedValue = value.trim();
            return (
              !!trimmedValue ||
              "School ID is required and cannot be just whitespace."
            );
          },
        ];
      },

      passwordRules() {
        return [
          (value) => {
            const trimmedValue = value.trim();
            return !!trimmedValue || "Password must not be empty.";
          },
          (value) => {
            const trimmedValue = value.trim();
            return (
              trimmedValue.length >= 4 ||
              "Password must be at least 4 characters long."
            );
          },
          (value) => {
            const trimmedValue = value.trim();
            return (
              /[A-Z]/.test(trimmedValue) ||
              "Password must have at least one uppercase letter."
            );
          },
          (value) => {
            const trimmedValue = value.trim();
            return (
              /[a-z]/.test(trimmedValue) ||
              "Password must have at least one lowercase letter."
            );
          },
          (value) => {
            const trimmedValue = value.trim();
            return (
              /\d/.test(trimmedValue) ||
              "Password must have at least one number."
            );
          },
        ];
      },

      emailRules() {
        return [
          (value) => {
            const trimmedValue = value.trim();
            return !!trimmedValue || "Email is required.";
          },
          (value) => {
            const trimmedValue = value.trim();
            return (
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue) ||
              "Invalid email format."
            );
          },
        ];
      },
    },

    actions: {},
  },
);

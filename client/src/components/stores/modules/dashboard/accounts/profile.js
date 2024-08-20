// src/store/modules/riders.js

import { defineStore } from "pinia";
import axios from "axios";
import {
  useDashboardStateManagerStore,
  useAuthStore,
  useEditAdminStore,
  useEditStudentStore,
  useEditStaffStore,
  useEditFacultyStore,
} from "@/components/stores/index";
import { updateAdmin } from "@/components/api/accounts/Admin.vue";
import { updateStudent } from "@/components/api/accounts/Student.vue";
import { updateStaff } from "@/components/api/accounts/Staff.vue";
import { updateFaculty } from "@/components/api/accounts/Faculty.vue";

export const useProfileStore = defineStore("edit-profile", {
  state: () => ({
    isAdminEditModalOpen: false,
    isStudentEditModalOpen: false,
    isStaffEditModalOpen: false,
    isFacultyEditModalOpen: false,
    idToEdit: "",
    isLoading: false,
    images: [], // Array to hold selected images
  }),
  actions: {
    handleToggleEditProfileModal(isModalOpen, id, role) {
      console.log(role);
      if (role === "admin") {
        this.isAdminEditModalOpen = isModalOpen;
        this.idToEdit = id;
      } else if (role === "student") {
        this.isStudentEditModalOpen = isModalOpen;
        this.idToEdit = id;
      } else if (role === "staff") {
        this.isStaffEditModalOpen = isModalOpen;
        this.idToEdit = id;
      } else if (role === "faculty") {
        this.isFacultyEditModalOpen = isModalOpen;
        this.idToEdit = id;
      }
    },
    hancleCloseProfileModal(value, role) {
      if (role === "admin") {
        this.isAdminEditModalOpen = value;
      } else if (role === "student") {
        this.isStudentEditModalOpen = value;
      } else if (role === "staff") {
        this.isStaffEditModalOpen = value;
      } else if (role === "faculty") {
        this.isFacultyEditModalOpen = value;
      }
    },

    async uploadFilesAsync() {
      const authStore = useAuthStore();
      const editAdminStore = useEditAdminStore();
      const editStudentStore = useEditStudentStore();
      const editStaffStore = useEditStaffStore();
      const editFacultyStore = useEditFacultyStore();
      const role =
        authStore.auth?.userDetailsId?.userAccountId?.roleDetailsId?.role;
      const cloudName = "dijhxviqe";

      this.isLoading = true;
      try {
        for (const image of this.images) {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "uploadNews");
          const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

          const res = await axios.post(api, data);
          const secure_url = res.data.secure_url;

          if (role === "admin") {
            editAdminStore.picture = secure_url;
          } else if (role === "student") {
            editStudentStore.picture = secure_url;
          } else if (role === "staff") {
            editStaffStore.picture = secure_url;
          } else if (role === "faculty") {
            editFacultyStore.picture = secure_url;
          }
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async handleEditAdmin() {
      const editAdminStore = useEditAdminStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      const authStore = useAuthStore();
      this.isLoading = true;

      try {
        const response = await updateAdmin({
          id: this.idToEdit,
          body: { ...editAdminStore.editAdmin },
        });

        if (response) {
          const updatedAdmin =
            authStore.auth?._id === this.idToEdit ? response.data : {};
          console.log(updatedAdmin, "updatedAdmmin");
          authStore.auth = updatedAdmin;

          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Edited Profile";
          dashboardStateManagerStore.snackbarColor = "success";
          this.isAdminEditModalOpen = false;
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage = errorMessage;
        dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false;
      }
    },
    async handleEditStudent() {
      const editStudentStore = useEditStudentStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      const authStore = useAuthStore();
      this.isLoading = true;
   

      try {
        const response = await updateStudent({
          id: this.idToEdit,
          body: { ...editStudentStore.editStudent },
        });

        if (response) {
          const updateStudent =
            authStore.auth?._id === this.idToEdit ? response.data : {};
          authStore.auth = updateStudent;
          
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Edited Profile";
          dashboardStateManagerStore.snackbarColor = "success";
          this.isStudentEditModalOpen = false;
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage = errorMessage;
        dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false;
      }
    },
    async handleEditStaff() {
      const editStaffStore = useEditStaffStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      const authStore = useAuthStore();
      this.isLoading = true;

      try {
        const response = await updateStaff({
          id: this.idToEdit,
          body: { ...editStaffStore.editStaff },
        });

        if (response) {
          const updateStaff =
            authStore.auth?._id === this.idToEdit ? response.data : {};
          authStore.auth = updateStaff;
          
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Edited Profile";
          dashboardStateManagerStore.snackbarColor = "success";
          this.isStaffEditModalOpen = false;
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage = errorMessage;
        dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false;
      }
    },
    async handleEditFaculty() {
      const editFacultyStore = useEditFacultyStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      const authStore = useAuthStore();
      this.isLoading = true;

      try {
        const response = await updateFaculty({
          id: this.idToEdit,
          body: { ...editFacultyStore.editFaculty },
        });

        if (response) {
          const updateFaculty =
            authStore.auth?._id === this.idToEdit ? response.data : {};
          authStore.auth = updateFaculty;
          // retrieveStudentStore
          dashboardStateManagerStore.snackbar = true;
          dashboardStateManagerStore.snackbarMessage =
            "Successfully Edited Profile";
          dashboardStateManagerStore.snackbarColor = "success";
          this.isFacultyEditModalOpen = false;
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage = errorMessage;
        dashboardStateManagerStore.snackbarColor = "error";
      } finally {
        this.isLoading = false;
      }
    },

    async handleSubmit() {
      const authStore = useAuthStore();

      const role =
        authStore.auth?.userDetailsId?.userAccountId?.roleDetailsId?.role;

      try {
        this.isLoading = true;
        await this.uploadFilesAsync();

        if (role === "admin") {
          await this.handleEditAdmin();
        } else if (role === "student") {
          await this.handleEditStudent();
        } else if (role === "staff") {
          await this.handleEditStaff();
        } else if (role === "faculty") {
          await this.handleEditFaculty();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

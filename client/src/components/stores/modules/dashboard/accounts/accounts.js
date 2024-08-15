import { createAccount } from "@/components/api/Accounts.vue";
import { defineStore } from "pinia";
import {
  useRetrieveStudentStore,
  useRetrieveStaffStore,
  useRetrieveFacultyStore,
  useDashboardStateManagerStore,
} from "@/components/stores/index";
export const useAccountStore = defineStore("account", {
  state: () => ({
    schoolId: "",
    email: "",
    password: "",
    role: "",
    isCreateAccountModalOpen: false,
    isLoading: false,
    showPassword: false,
  }),
  getters: {},

  actions: {
    handleOpenAccountModal() {
      this.isCreateAccountModalOpen = true;
    },
    handleCloseAccountModal() {
      this.isCreateAccountModalOpen = false;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleCreateAccount() {
      const retrieveStudentStore = useRetrieveStudentStore();
      const retrieveStaffStore = useRetrieveStaffStore();
      const retrieveFacultyStore = useRetrieveFacultyStore();
      const dashboardStateManagerStore = useDashboardStateManagerStore();
      this.isLoading = true;
      let body;

      if (this.role.toLowerCase() === "student") {
        body = {
          firstName: "",
          middleName: "",
          suffix: "",
          lastName: "",
          email: this.email,
          password: this.password,
          isIdIssued: false,
          picture: "",
          semesterType: "",
          schoolYear: "",
          course: "",
          role: this.role.toLowerCase(),
          contactNumber: "",
          birthDate: "",
          contactPerson: "",
          affidavit: "",
          message: "",
          address: "",
          schoolId: this.schoolId,
        };
      } else if (
        this.role.toLowerCase() === "staff" ||
        this.role.toLowerCase() === "faculty"
      ) {
        body = {
          firstName: "",
          middleName: "",
          suffix: "",
          lastName: "",
          email: this.email,
          password: this.password,
          isIdIssued: false,
          role: this.role.toLowerCase(),
          contactNumber: "",
          birthDate: "",
          position: "",
          designation: "",
          hgt: "",
          wgt: "",
          sss: "",
          tin: "",
          contactPerson: "",
          affidavit: "",
          message: "",
          address: "",
          schoolId: this.schoolId,
        };
      }

      try {
        const response = await createAccount({ body });

        if (this.role.toLowerCase() === "student") {
          retrieveStudentStore.students.push(response.data);
        } else if (this.role.toLowerCase() === "staff") {
          retrieveStaffStore.staffs.push(response.data);
        } else if (this.role.toLowerCase() === "faculty") {
          retrieveFacultyStore.faculties.push(response.data);
        }

        dashboardStateManagerStore.snackbar = true;
        dashboardStateManagerStore.snackbarMessage =
          "Successfully Added Account";
        dashboardStateManagerStore.snackbarColor = "success";

        this.isCreateAccountModalOpen = false;

        setTimeout(() => {
          this.email = "";
          this.password = "";
          this.role = "";
          this.schoolId = "";
        }, 500);
      } catch (error) {
        const errorMessage = error.response.data.message || "Something Error Occur";
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

<template>
  <div>
    <div v-if="authStore.isLoading">
      <div class="fixed inset-0 z-50 bg-white">
        <Loading />
      </div>
    </div>
    <div v-else>
      <component :is="profileComponent" />
      <component :is="editModalComponent" />
    </div>
    <div v-if="dashboardStateManagerStore.snackbar">
      <Snackbar />
    </div>
  </div>
</template>

<script setup>
// vue
import { computed, defineAsyncComponent } from "vue";
// store
import {
  useAuthStore,
  useDashboardStateManagerStore,
} from "@/components/stores";
// reusable
import Loading from "@/components/reusable/Loading.vue";
const Snackbar = defineAsyncComponent(
    () => import("@/components/reusable/Snackbar.vue"),
);
// components
import AdminProfile from "@/components/views/dashboard/profile/AdminProfile.vue";
import StudentProfile from "@/components/views/dashboard/profile/StudentProfile.vue";
import StaffFaculty from "@/components/views/dashboard/profile/StaffFaculty.vue";
import AdminEditModal from "@/components/views/dashboard//profile/modals/AdminEditModal.vue";
import StudentEditModal from "@/components/views/dashboard//profile/modals/StudentEditModal.vue";
import StaffEditModal from "@/components/views/dashboard//profile/modals/EditStaffProfile.vue";
import FacultyEditModal from "@/components/views/dashboard//profile/modals/EditFacultyProfile.vue";

// invoke store
const authStore = useAuthStore();
const dashboardStateManagerStore = useDashboardStateManagerStore();
// computed
const personalInfo = computed(
  () => authStore.auth?.userDetailsId?.personalInfoId,
);
const userAccount = computed(
  () => authStore.auth?.userDetailsId?.userAccountId,
);
const roleDetails = computed(() => userAccount.value?.roleDetailsId);

const profileComponent = computed(() => {
  return roleDetails.value?.role === "admin" ? AdminProfile : roleDetails.value?.role === 'student' ? StudentProfile : StaffFaculty;
});

const editModalComponent = computed(() => {
  return roleDetails.value?.role === "admin"
    ? AdminEditModal
    : roleDetails.value?.role === "student" ? StudentEditModal : roleDetails.value?.role === "staff" ? StaffEditModal : FacultyEditModal;
    
});
</script>

<template>
  <v-app>
    <Sidebar />
    <Header />

    <v-main class="bg-grey-lighten-3">
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
  
  <script setup>
import { defineAsyncComponent, onMounted } from "vue";
import { useAuthStore, useRetrieveStudentStore, useRetrieveStaffStore, useRetrieveFacultyStore, } from "@/components/stores/index"
const Sidebar = defineAsyncComponent(() => import("./Sidebar.vue"));
const Header = defineAsyncComponent(() => import("./Header.vue"));
// ############################################################## import router #############################################################

const authStore = useAuthStore()
const retrieveStudentStore = useRetrieveStudentStore()
const retrieveStaffStore = useRetrieveStaffStore()
const retrieveFacultyStore = useRetrieveFacultyStore()



onMounted(() => {

authStore.authentication()
retrieveStudentStore.retrieveAllStudents()
retrieveStaffStore.retrieveAllStaffs()
retrieveFacultyStore.retrieveAllFaculty()
})
</script>
  
  <script>
</script>
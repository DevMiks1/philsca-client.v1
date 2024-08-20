<template>
  <v-app>
    <Suspense>
      <template #default>
        <div>
          <Sidebar />
          <Header />

          <v-main class="bg-grey-lighten-3">
            <v-container class="py-8 px-6" fluid>
              <router-view></router-view>
            </v-container>
          </v-main>
        </div>
      </template>
      <template #fallback>
        <div class="fixed inset-0 z-50 bg-white">
          <Loading />
        </div>
      </template>
    </Suspense>

  </v-app>
</template>

<script setup>
// vue
import { defineAsyncComponent, onMounted } from "vue";
// store
import { useAuthStore, useRetrieveStudentStore, useRetrieveStaffStore, useRetrieveFacultyStore, } from "@/components/stores/index"
// reusable
import Loading from "@/components/reusable/Loading.vue";
// components
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
<template>
  <div>
    <!-- for small screen -->
    <div class="md:hidden">
      <v-card-item class="bg-orange-darken-3">

        <v-text-field v-model="retrieveStaffStore.search" density="compact" label="Search"
          prepend-inner-icon="mdi-magnify" variant="solo" flat hide-details single-line></v-text-field>
      </v-card-item>
    </div>

    <!-- For medium and larger screens -->
    <v-toolbar class="bg-orange-darken-3">
      <v-chip label class="ml-5" prepend-icon="mdi-account-tie">
        
        <v-card-title> List of Faculties</v-card-title>
      </v-chip>

      <v-spacer></v-spacer>
      <div class="mr-5 hidden w-[300px] md:block">
        <v-text-field v-model="retrieveStaffStore.search" density="compact" label="Search"
          prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line></v-text-field>
      </div>

      <!-- <v-btn
          class="bg-green-darken-2 mr-4"
          @click="employeesCreateStore.handleToggleEmployeeCreateModal(true)"
          ><v-icon>mdi-plus</v-icon>Add Employee</v-btn
        > -->
    </v-toolbar>
  </div>
</template>

<script setup>
// import store
import {
  useRetrieveStaffStore,
} from "@/components/stores/index";

const retrieveStaffStore = useRetrieveStaffStore()
</script>
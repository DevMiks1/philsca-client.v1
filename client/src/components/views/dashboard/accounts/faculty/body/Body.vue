<template>
  <div>
    <v-data-table :headers="headers" :search="retrieveFacultyStore.search" :items="displayFacultyTable" items-per-page="5">
      <!-- header -->
      <template v-slot:[`header.schoolId`]="{ column }">
        <p class="text-uppercase text-[.875rem] font-[500] text-no-wrap">{{ column.title }}</p>
      </template>
      <template v-slot:[`header.fullName`]="{ column }">
        <p class="text-uppercase text-[.875rem] font-[500] text-no-wrap">{{ column.title }}</p>
      </template>
      <template v-slot:[`item.fullName`]="{ item }">
        <p class=" text-no-wrap">{{ item.fullName }}</p>
      </template>
      <template v-slot:[`header.course`]="{ column }">
        <p class="text-uppercase text-[.875rem] font-[500] text-no-wrap">{{ column.title }}</p>
      </template>
      <template v-slot:[`header.schoolYear`]="{ column }">
        <p class="text-uppercase text-[.875rem] font-[500] text-no-wrap">{{ column.title }}</p>
      </template>
      <template v-slot:[`header.actions`]="{ column }">
        <p class="text-uppercase text-[.875rem] font-[500]">{{ column.title }}</p>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="flex gap-2">
          <v-btn @click="
            editFacultyStore.handleToggleEditFacultyModal({
              id: item._id,
              isModalOpen: true,
            })
            " class="bg-green-lighten-4 text-green-darken-2">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn @click="
            deleteFacultyStore.handleToggleDeleteFacultyModal({
              id: item._id,
              isModalOpen: true,
            })
            " class="bg-red-lighten-4 text-red-darken-2">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn @click="
            viewFacultyStore.toggleViewFacultyModal({
              id: item._id,
              isModalOpen: true,
            })
            " class="bg-blue-lighten-4 text-blue-darken-2">
            <v-icon>mdi-eye</v-icon>
          </v-btn>

        </div>

      </template>

    </v-data-table>
  </div>
</template>
<script setup>
// vue
import { computed } from "vue";
// import store
import {
  useRetrieveFacultyStore,
  useEditFacultyStore,
  useDeleteFacultyStore,
  useViewFacultyStore,
} from "@/components/stores/index";
// invoke store
const retrieveFacultyStore = useRetrieveFacultyStore();
const editFacultyStore = useEditFacultyStore();
const deleteFacultyStore = useDeleteFacultyStore();
const viewFacultyStore = useViewFacultyStore();

// computed
const displayFacultyTable = computed(() => {
  return [...retrieveFacultyStore.displayFacultyTable].reverse();
});
const headers = [
  { title: "Faculty Id", value: "schoolId" },
  { title: "Name", value: "fullName" },
  // { title: "Trip Status", value: "tripStatus" },
  // { title: "Rider Status", value: "riderStatus" },
  { title: "Position", value: "position" },
  { title: "Actions", value: "actions" },
];
</script>
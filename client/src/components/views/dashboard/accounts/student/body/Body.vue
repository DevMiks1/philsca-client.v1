<template>
  <div>
    <div v-if="retrieveStudentStore.isLoading">
      <div class="fixed inset-0 z-50 bg-white">
        <Loading />
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :search="retrieveStudentStore.search"
        :items="displayStudentsTable"
        items-per-page="5"
      >
        <!-- header -->
        <template v-slot:[`header.schoolId`]="{ column }">
          <p class="text-uppercase text-no-wrap text-[.875rem] font-[500]">
            {{ column.title }}
          </p>
        </template>
        <template v-slot:[`header.fullName`]="{ column }">
          <p class="text-uppercase text-no-wrap text-[.875rem] font-[500]">
            {{ column.title }}
          </p>
        </template>
        <template v-slot:[`item.fullName`]="{ item }">
          <p class="text-no-wrap">{{ item.fullName }}</p>
        </template>
        <template v-slot:[`header.course`]="{ column }">
          <p class="text-uppercase text-no-wrap text-[.875rem] font-[500]">
            {{ column.title }}
          </p>
        </template>
        <template v-slot:[`header.schoolYear`]="{ column }">
          <p class="text-uppercase text-no-wrap text-[.875rem] font-[500]">
            {{ column.title }}
          </p>
        </template>
        <template v-slot:[`header.actions`]="{ column }">
          <p class="text-uppercase text-[.875rem] font-[500]">
            {{ column.title }}
          </p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="flex gap-2">
            <v-btn
              @click="
                editStudentStore.handleToggleEditStudentModal({
                  id: item._id,
                  isModalOpen: true,
                })
              "
              class="bg-green-lighten-4 text-green-darken-2"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              @click="
                deleteStudentStore.handleToggleDeleteStudentModal({
                  id: item._id,
                  isModalOpen: true,
                })
              "
              class="bg-red-lighten-4 text-red-darken-2"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              @click="
                viewStudentStore.toggleViewStudentModal({
                  id: item._id,
                  isModalOpen: true,
                })
              "
              class="bg-blue-lighten-4 text-blue-darken-2"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script setup>
// vue
import { computed } from "vue";
// import store
import {
  useRetrieveStudentStore,
  useEditStudentStore,
  useDeleteStudentStore,
  useViewStudentStore,
} from "@/components/stores/index";
// reusable
import Loading from "@/components/reusable/Loading.vue";
// invoke store
const retrieveStudentStore = useRetrieveStudentStore();
const editStudentStore = useEditStudentStore();
const deleteStudentStore = useDeleteStudentStore();
const viewStudentStore = useViewStudentStore();

// computed
const displayStudentsTable = computed(() => {
  return [...retrieveStudentStore.displayStudentTable].reverse();
});
const headers = [
  { title: "Student Id", value: "schoolId" },
  { title: "Name", value: "fullName" },
  // { title: "Trip Status", value: "tripStatus" },
  // { title: "Rider Status", value: "riderStatus" },
  { title: "Course", value: "course" },
  { title: "Schoolyear", value: "schoolYear" },

  { title: "Actions", value: "actions" },
];
</script>

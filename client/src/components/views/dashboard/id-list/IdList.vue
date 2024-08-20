<template>
  <div>
    <v-card class="bg-blue-darken-3">
      <div class="border-bottom px-5 ">
        <div class="max-w-[200px] mt-[1rem]">

          <v-select
            :items="status"
            density="comfortable"
            label="Select Status"
            v-model="idListStore.status"
          ></v-select>
        </div>
      </div>
      <v-tabs v-model="tab" align-tabs="end" color="white">
        <v-tab value="students">Students</v-tab>
        <v-tab value="staff">Staffs</v-tab>
        <v-tab value="faculty">Faculties</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="students">
          <Student />
        </v-tabs-window-item>
        <!-- <v-tabs-window-item value="staff">
          <Staff />
        </v-tabs-window-item>
        <v-tabs-window-item value="faculty">
          <Faculty />
        </v-tabs-window-item> -->
      </v-tabs-window>
    </v-card>
  </div>
</template>

<script setup>
// vue
import { defineAsyncComponent, ref } from "vue";
// reusable
import Loading from "@/components/reusable/Loading.vue";
import { useIdListStore } from "@/components/stores/index";

const idListStore = useIdListStore()

// ref
const tab = ref(null);
// components
const Student = defineAsyncComponent(() => import("./student/Student.vue"));
// const Staff = defineAsyncComponent(() => import("./staff/Staff.vue"));
// const Faculty = defineAsyncComponent(() => import("./faculty/Faculty.vue"));

// store
// invoke store
const status = ref(["issued", "non-issued", ]);
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgb(35, 49, 170);
}
</style>

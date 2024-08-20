<template>
  <div>
    <v-card class="bg-blue-darken-3">
      <v-card-actions class="border-bottom">
        <v-spacer></v-spacer>
        <v-btn class="bg-orange-darken-3" @click="handleOpenAccountModal"><v-icon class="pr-2">mdi-plus</v-icon>Add
          Account</v-btn>
      </v-card-actions>
      <v-tabs v-model="tab" align-tabs="end" color="white">
        <v-tab value="students">Students</v-tab>
        <v-tab value="staff">Staffs</v-tab>
        <v-tab value="faculty">Faculties</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="students">
          <Student />
        </v-tabs-window-item>
        <v-tabs-window-item value="staff">
          <Staff />
        </v-tabs-window-item>
        <v-tabs-window-item value="faculty">
          <Faculty />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
    <!-- modal -->
    <CreateAccountModal />
  </div>
</template>

<script setup>
// vue
import { defineAsyncComponent, ref } from "vue";
// reusable
import Loading from "@/components/reusable/Loading.vue";

// ref
const tab = ref(null);
// components
const Student = defineAsyncComponent(() => import("./student/Student.vue"));
const Staff = defineAsyncComponent(() => import("./staff/Staff.vue"));
const Faculty = defineAsyncComponent(() => import("./faculty/Faculty.vue"));
const CreateAccountModal = defineAsyncComponent(
  () => import("./CreateAccountModal.vue"),
);

// store
import { useAccountStore } from "@/components/stores/index";
// invoke store
const createAccountStore = useAccountStore();

const handleOpenAccountModal = (value) => {
  createAccountStore.handleOpenAccountModal(value);
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgb(35, 49, 170);
}
</style>

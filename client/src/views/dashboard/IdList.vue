<template>
  <div>
    <div>
      <IdList />
    </div>
    <div v-if="dashboardStateManagerStore.snackbar">
      <Snackbar />
    </div>
  </div>
</template>

<script setup>
// vue
import { defineAsyncComponent } from "vue";
// reusable
import Snackbar from "@/components/reusable/Snackbar.vue";
// store
import { useDashboardStateManagerStore } from "@/components/stores";
// invoke store
const dashboardStateManagerStore = useDashboardStateManagerStore();
// components
const IdList = defineAsyncComponent(
  () => import("@/components/views/dashboard/id-list/IdList.vue"),
);
</script>

<style></style>

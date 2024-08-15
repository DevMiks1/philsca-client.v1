<template>
  <Suspense>
    <template #default>
      <StatusPanel />
    </template>
    <template #fallback>
      <div class="fixed inset-0 bg-white">
        <Loading />
      </div>
    </template>
  </Suspense>
</template>

<script setup>
// vue
import { defineAsyncComponent } from "vue";
// components
const StatusPanel = defineAsyncComponent(
  () => import("@/components/views/dashboard/status-panel/StatusPanel.vue"),
);
// reusable
import Loading from "@/components/reusable/Loading.vue"
</script>

<style></style>

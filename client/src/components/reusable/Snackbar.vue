<template>
    <v-snackbar
      v-model="dashboardStateManagerStore.snackbar"
      :timeout="dashboardStateManagerStore.timeout"
      :color="dashboardStateManagerStore.snackbarColor"
      location="top"
      dark
    >
      {{ dashboardStateManagerStore.snackbarMessage }}
    </v-snackbar>
  </template>
  
  <script setup>
  // import modules
  import { useDashboardStateManagerStore } from "@/components/stores/index";
  const dashboardStateManagerStore = useDashboardStateManagerStore();
  
  
  </script>
  
  <style scoped></style>
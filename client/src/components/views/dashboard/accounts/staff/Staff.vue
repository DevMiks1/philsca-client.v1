<template>
  <div>
    <div>
      <Header />
      <Body />
    </div>
    <EditStaffModal />
    <DeleteStaffModal />
    <ViewStaffModal />
  </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent } from 'vue';
  
  const Header = defineAsyncComponent(() => import('./header/Header.vue'))
  const Body = defineAsyncComponent(() => import('./body/Body.vue'))
  const EditStaffModal = defineAsyncComponent(() => import('./modal/EditStaffModal.vue'))
  const DeleteStaffModal = defineAsyncComponent(() => import('./modal/DeleteStaffModal.vue'))

  const ViewStaffModal = defineAsyncComponent(() => import('./modal/ViewStaffModal.vue'))

  </script>
  
  <style></style>
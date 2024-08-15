<template>
  <div>
    <div>
      <Header />
      <Body />
    </div>
    <EditFacultyModal />
    <DeleteFacultyModal />
    <ViewFacultyModal />
  </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent } from 'vue';
  
  const Header = defineAsyncComponent(() => import('./header/Header.vue'))
  const Body = defineAsyncComponent(() => import('./body/Body.vue'))
  const EditFacultyModal = defineAsyncComponent(() => import('./modal/EditFacultyModal.vue'))
  const DeleteFacultyModal = defineAsyncComponent(() => import('./modal/DeleteFacultyModal.vue'))

  const ViewFacultyModal = defineAsyncComponent(() => import('./modal/ViewFacultyModal.vue'))

  </script>
  
  <style></style>
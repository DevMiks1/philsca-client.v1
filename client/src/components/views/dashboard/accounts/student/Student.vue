<template>
  <div>

    <div>
      <Header />
      <Body />
    </div>
    <EditStudentModal />
    <DeleteStudentModal />
    <ViewStudentModal />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const Header = defineAsyncComponent(() => import('./header/Header.vue'))
const Body = defineAsyncComponent(() => import('./body/Body.vue'))
const EditStudentModal = defineAsyncComponent(() => import('./modal/EditStudentModal.vue'))
const DeleteStudentModal = defineAsyncComponent(() => import('./modal/DeleteStudentModal.vue'))
const ViewStudentModal = defineAsyncComponent(() => import('./modal/ViewStudentModal.vue'))
</script>

<style></style>
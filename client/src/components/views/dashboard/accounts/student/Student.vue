<template>
  <div>
    <div>
      <Header />

      <Body />
    </div>


  </div>
</template>

<script setup>
// vue
import { defineAsyncComponent } from "vue";
// components
const Header = defineAsyncComponent(() => import("./header/Header.vue"));
const Body = defineAsyncComponent(() => import("./body/Body.vue"));
// modal
const EditStudentModal = defineAsyncComponent(
  () => import("./modal/EditStudentModal.vue"),
);
const DeleteStudentModal = defineAsyncComponent(
  () => import("./modal/DeleteStudentModal.vue"),
);
const ViewStudentModal = defineAsyncComponent(
  () => import("./modal/ViewStudentModal.vue"),
);
</script>

<style></style>

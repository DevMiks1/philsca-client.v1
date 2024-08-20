<template>
  <div>
    <div>
      <Header />

      <Body />
    </div>

    <AprrovedId />
  </div>
</template>

<script setup>
// vue
import { defineAsyncComponent } from "vue";
// components
const Header = defineAsyncComponent(() => import("./header/Header.vue"));
const Body = defineAsyncComponent(() => import("./body/Body.vue"));
// modal
const AprrovedId = defineAsyncComponent(
  () => import("./modals/AprrovedId.vue"),
);
</script>

<style></style>

<template>
  <div>
    <Suspense>
      <template #default>
        <div>
          <Header />
          <Body />
        </div>
      </template>
      <template #fallback>
        <div class="fixed inset-0 z-50 bg-white">
          <Loading />
        </div>
      </template>
    </Suspense>

    <EditStudentModal />
    <DeleteStudentModal />
    <ViewStudentModal />
  </div>
</template>

<script setup>
// vue
import { defineAsyncComponent } from "vue";
// reusable
import Loading from "@/components/reusable/Loading.vue";
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

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

    <EditStaffModal />
    <DeleteStaffModal />
    <ViewStaffModal />
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
const EditStaffModal = defineAsyncComponent(
  () => import("./modal/EditStaffModal.vue"),
);
const DeleteStaffModal = defineAsyncComponent(
  () => import("./modal/DeleteStaffModal.vue"),
);

const ViewStaffModal = defineAsyncComponent(
  () => import("./modal/ViewStaffModal.vue"),
);
</script>

<style></style>

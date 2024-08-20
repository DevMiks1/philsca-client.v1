<template>
  <div>
    <Suspense>
      <template #default>
        <v-row no-gutters >
          <v-col cols="12" sm="5" md="4" lg="3" order="2" order-sm="1" class=" px-0 bg-white">
            <Content />
          </v-col>
          <v-col cols="12" sm="7" md="8" lg="9" order="1" order-sm="2" class=" px-0">

            <Background />
          </v-col>
        </v-row>
      </template>
      <template #fallback>
        <div class="fixed inset-0 z-50 bg-white">
          <Loading />
        </div>
      </template>
    </Suspense>
    <div v-if="dashboardStateManagerStore.snackbar">
      <Snackbar />
    </div>
  </div>
</template>

<script setup>
// ############################################################## vue #############################################################
import { defineAsyncComponent, onMounted, ref } from "vue";
// ############################################################## vue #############################################################

// ############################################################## components #############################################################
const Background = defineAsyncComponent(() => import("@/components/views/login/Background.vue"))
const Content = defineAsyncComponent(
  () => import("@/components/views/login/Content.vue"),
);
const Snackbar = defineAsyncComponent(() => import("@/components/reusable/Snackbar.vue"))
// ############################################################## components #############################################################

// ############################################################## store #############################################################
import { useDashboardStateManagerStore } from "@/components/stores/index"
// ############################################################## store #############################################################

// ############################################################## invoke store #############################################################
const dashboardStateManagerStore = useDashboardStateManagerStore()
// ############################################################## invoke store #############################################################

// ############################################################## ref #############################################################
const isLoading = ref(true);
// ############################################################## ref #############################################################

// ############################################################## reusable #############################################################
import Loading from "@/components/reusable/Loading.vue";
// ############################################################## reusable #############################################################

// ############################################################## others #############################################################
setTimeout(() => {
  isLoading.value = false;
}, 2000);
// ############################################################## others #############################################################

// onMounted(() => {
//   accountStore.fetchAccounts()
// })
</script>
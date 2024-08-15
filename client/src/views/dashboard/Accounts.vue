<template>
    <div>
        <Suspense>
            <template #default>
                <Accounts />
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
// vue
import { defineAsyncComponent } from "vue";
// store
import { useDashboardStateManagerStore } from "@/components/stores/index";
// invoke store
const dashboardStateManagerStore = useDashboardStateManagerStore();
const Accounts = defineAsyncComponent(
    () => import("@/components/views/dashboard/accounts/Accounts.vue"),
);
// reusable
const Snackbar = defineAsyncComponent(
    () => import("@/components/reusable/Snackbar.vue"),
);
const Loading = defineAsyncComponent(
    () => import("@/components/reusable/Loading.vue"),
);
</script>

<style></style>

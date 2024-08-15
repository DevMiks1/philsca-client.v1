<template>
    <Suspense>
        <template #default>
            <Profile />
        </template>
        <template #fallback>
            <div class="fixed inset-0 bg-white">
                <Loading />
            </div>
        </template>
    </Suspense>
</template>

<script setup>
// vue
import { defineAsyncComponent } from "vue";
// components
const Profile = defineAsyncComponent(
    () => import("@/components/views/dashboard/profile/Profile.vue"),
);
// reusable
import Loading from "@/components/reusable/Loading.vue"

</script>

<style></style>
<template>
    <div>
        <IdLost />
    </div>
</template>

<script setup>
// ############################################################# import vue #############################################################
import { defineAsyncComponent } from 'vue';
// ############################################################# import vue #############################################################

// ############################################################# components #############################################################
const IdLost = defineAsyncComponent(() => import("@/components/views/dashboard/id-lost/IdLost.vue"))
// ############################################################# components #############################################################



</script>

<style></style>
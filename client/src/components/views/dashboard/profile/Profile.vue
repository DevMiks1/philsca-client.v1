<template>
    <div>
        <h2 class="text-[2rem] font-[500] pb-[2rem]">User Profile</h2>
        <v-container></v-container>
        <v-row class="bg-white rounded-lg">
            <v-col md="4" >
                <v-avatar size="120">
                    <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                </v-avatar>
                <p class="pt-[1rem] text-[1.1rem] font-[500]">{{`${authStore.auth.firstName || 'EMPTY'} ${authStore.auth.middleName} ${authStore.auth.lastName || 'EMPTY'} ${authStore.auth.suffix || ''}`  }}</p>
            </v-col>
            <v-col md="8"></v-col>
        </v-row>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/components/stores';
const authStore = useAuthStore()

</script>

<style></style>
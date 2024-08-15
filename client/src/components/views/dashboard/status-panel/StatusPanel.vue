<template>
  <div class="bg-blue-darken-3 rounded-[.5rem]">
    <div v-show="reminderPanel">
      <div class="text-end pr-4 pt-4" @click="reminderPanel = false">
        <v-btn icon="mdi-close" size="small"></v-btn>
      </div>
      <p  class="p-4 text-[1rem] font-[400]">Hi, {{ authStore.auth.firstName || 'EMPTY'}} Welcome to Dashboard. Please take a
        moment to review all the details carefully. Make sure to fill in all the important information to ensure
        everything is complete and accurate. If you have any questions or need assistance, feel free to reach out. Your
        attention to detail will help us provide the best possible service.</p>

    </div>
  </div>
</template>

<script setup>
// vue
import { ref } from 'vue';
// store
import { useAuthStore } from '@/components/stores';
// invoke store
const authStore = useAuthStore()
const reminderPanel = ref(true)

</script>

<style></style>
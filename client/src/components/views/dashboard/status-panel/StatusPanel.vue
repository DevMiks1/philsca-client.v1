<template>
  <div class="bg-blue-darken-3 rounded-[.5rem]">
    <div v-show="reminderPanel">
      <div v-if="authStore.isLoading">
        <div class="fixed inset-0 z-50 bg-white">
          <Loading />
        </div>
      </div>
      <div class="pr-4 pt-4 text-end" @click="reminderPanel = false" v-else>
        <v-btn icon="mdi-close" size="small"></v-btn>
      </div>
      <p class="p-4 text-[1rem] font-[400]">
        Hi, {{ personalInfo?.firstName || "N/A" }} Welcome to Dashboard. Please take
        a moment to review all the details carefully. Make sure to fill in all
        the important information to ensure everything is complete and accurate.
        If you have any questions or need assistance, feel free to reach out.
        Your attention to detail will help us provide the best possible service.
      </p>
    </div>
  </div>
</template>

<script setup>
// vue
import { computed, ref } from "vue";
// store
import { useAuthStore } from "@/components/stores";
import Loading from "@/components/reusable/Loading.vue";
// invoke store
const authStore = useAuthStore();
const reminderPanel = ref(true);

// computed
const personalInfo = computed(
  () => authStore.auth?.userDetailsId?.personalInfoId,
);
const userAccount = computed(
  () => authStore.auth?.userDetailsId?.userAccountId,
);
const roleDetails = computed(() => userAccount.value?.roleDetailsId);
</script>

<style></style>

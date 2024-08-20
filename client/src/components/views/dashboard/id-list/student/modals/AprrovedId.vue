<template>
  <div>
    <v-dialog
      v-model="idListStore.isApprovedModalOpen"
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="idListStore.isApprovedModalOpen"
        width="500px"
        max-height="600px"
        class="edit-student-modal-scrollbar mx-auto"
      >
        <div class="bg-blue-darken-3 flex items-center px-3 py-3">
          <p class="text-[1.1rem] font-[500] sm:text-[1.3rem]">Approved ID</p>
          
          
        </div>
        <v-container>
          <p class="text-center text-[1.1rem]  pb-[2rem]">
            Are you sure you want to approve this? Doing so will mark you as
            issued.
          </p>

          <div class="flex items-center justify-center gap-6 ">
            <v-btn icon="mdi-check-bold" color="success" @click="idListStore.handleIssuedId" :loading="idListStore.isLoading"></v-btn>
            <v-btn  icon="mdi-close" color="error" @click="idListStore.toggleAprroved(false)"></v-btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// vue
import { computed, ref, watch } from "vue";
// store
import { useIdListStore } from "@/components/stores/index";

// invoke store
const idListStore = useIdListStore();
// const accountStateManagerStore = useAccountStateManagerStore();
</script>

<style scoped></style>

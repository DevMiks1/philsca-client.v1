<template>
  <div>
    <v-dialog
      v-model="deleteFacultyStore.isDeleteFacultyModalOpen"
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="deleteFacultyStore.isDeleteFacultyModalOpen"
        max-width="500px"
        max-height="600px"
        class="y-axis-scrollbar mx-auto"
      >
        <div class="bg-blue-darken-3 flex items-center px-3 py-3">
          <p class="text-[1.1rem] font-[500] sm:text-[1.3rem]">
            Delete Account
          </p>
          <v-spacer></v-spacer>
          <div class="text-[.8rem]">
            <v-btn
              variant="tonal"
              size="small"
              @click="deleteFacultyStore.handleCloseDeleteFacultyModal(false)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </div>
        <v-container>
          <p class="text-center text-[1.3rem] sm:text-[1.5rem]">
            Are you sure, You want to delete?
          </p>
          <v-card-text class="px-0">
            Kindly put your valid password.</v-card-text
          >

          <v-form @submit.prevent="deleteFacultyStore.handleDeleteFaculty">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="deleteFacultyStore.password"
                  label="Password"
                  :type="deleteFacultyStore.showPassword ? 'text' : 'password'"
                  :append-inner-icon="
                    deleteFacultyStore.showPassword ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="
                    deleteFacultyStore.togglePasswordVisibility
                  "
                  :rules="deleteFacultyStore.passwordCheckingRules"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              block
              class="bg-orange-darken-3 mt-2"
              :disabled="!isValidForm"
              :loading="deleteFacultyStore.isLoading"
              >Delete</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// vue
import { computed } from "vue";
// store
import { useDeleteFacultyStore } from "@/components/stores/index";

// invoke store
const deleteFacultyStore = useDeleteFacultyStore();
// const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
  return deleteFacultyStore.passwordCheckingRules.every(
    (rule) => rule(deleteFacultyStore.password) === true,
  );
});
</script>

<style scoped></style>

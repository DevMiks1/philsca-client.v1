<template>
  <div>
    <v-dialog
      v-model="deleteStaffStore.isDeleteStaffModalOpen"
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="deleteStaffStore.isDeleteStaffModalOpen"
        max-width="500px"
        max-height="600px"
        class="y-axis-scrollbar mx-auto"
      >
        
          <div class="flex items-center py-3 px-3 bg-blue-darken-3">
            <p class="tet-[1.1rem] font-[500] sm:text-[1.3rem]">
              Delete Account
            </p>
            <v-spacer></v-spacer>
            <v-btn
              variant="tonal"
              size="small"
              @click="deleteStaffStore.handleCloseDeleteStaffModal(false)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
          <v-container>
        <p class="text-center text-[1.3rem] sm:text-[1.5rem]">
            Are you sure, You want to delete?
        </p>
        <v-card-text class="px-0"> Kindly put your valid password.</v-card-text>


          <v-form @submit.prevent="deleteStaffStore.handleDeleteStaff">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="deleteStaffStore.password"
                  label="Password"
                  :type="deleteStaffStore.showPassword ? 'text' : 'password'"
                  :append-inner-icon="
                    deleteStaffStore.showPassword ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="
                    deleteStaffStore.togglePasswordVisibility
                  "
                  :rules="deleteStaffStore.passwordCheckingRules"
                ></v-text-field>
              </v-col>
            </v-row>

           
              <v-btn
                type="submit"
                block
                class="bg-orange-darken-3 mt-2"
                :disabled="!isValidForm"
                :loading="deleteStaffStore.isLoading"
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
import { useDeleteStaffStore } from "@/components/stores/index";

// invoke store
const deleteStaffStore = useDeleteStaffStore();
// const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
  return deleteStaffStore.passwordCheckingRules.every(
    (rule) => rule(deleteStaffStore.password) === true,
  );
});
</script>

<style scoped></style>

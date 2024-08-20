<template>
  <div>
    <v-dialog
      v-model="accountStore.isCreateAccountModalOpen"
      persistent
      transition="dialog-bottom-transition"
      max-width="500"
    >
      <v-card
        v-if="accountStore.isCreateAccountModalOpen"
        class="create-account-modal bg-blue-darken-3"
      >
        <v-container>
          <div class="flex">
            <p class="text-[1.3rem] font-[500]">Create Account</p>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" @click="handleCloseAccountModal(false)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </v-container>
        <v-card-text class="pb-2 pt-3">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="School ID"
                  v-model="accountStore.schoolId"
                  :rules="accountStateManagerStore.schoolIdRules"
                  placeholder="Enter your school id"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="-mt-5">
                <v-text-field
                density="comfortable"
                  label="Email Address"
                  v-model="accountStore.email"
                  :rules="accountStateManagerStore.emailRules"
                  placeholder="Enter your email"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="-mt-5">
                <v-text-field
                density="comfortable"
                  label="Password"
                  v-model="accountStore.password"
                  :rules="accountStateManagerStore.passwordRules"
                  :type="accountStore.showPassword ? 'text' : 'password'"
                  :append-inner-icon="
                    accountStore.showPassword ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="accountStore.togglePasswordVisibility"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="-mt-3">
                <v-select
                  :items="role"
                  density="comfortable"
                  label="Select Role"
                  variant="outlined"
                  v-model="accountStore.role"
                ></v-select>
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              class="bg-orange-darken-3"
              block
              :disabled="!isValidForm"
              @click.prevent="handleCreateAccount"
              :loading="accountStore.isLoading"
              >Create Account</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// import vue
import { computed } from "vue";
// import modules
import {
  useAccountStore,
  useAccountStateManagerStore,
} from "@/components/stores/index";
const accountStore = useAccountStore();
const accountStateManagerStore = useAccountStateManagerStore();

import { ref } from "vue";

const role = ref(["Student", "Faculty", "Staff"]);
const handleCloseAccountModal = (value) => {
  accountStore.handleCloseAccountModal(value);
};
const handleCreateAccount = () => {
  accountStore.handleCreateAccount();
};
// computed
const isValidForm = computed(() => {
  return (
    accountStateManagerStore.schoolIdRules.every(
      (rule) => rule(accountStore.schoolId) === true,
    ) &&
    accountStateManagerStore.emailRules.every(
      (rule) => rule(accountStore.email) === true,
    ) &&
    accountStateManagerStore.passwordRules.every(
      (rule) => rule(accountStore.password) === true,
    )
  );
});
</script>

<style scoped>
.create-account-modal::-webkit-scrollbar {
  width: 10px;
}

.create-account-modal::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ca3535, #d58282);
  border-radius: 2px;
  height: 10px;
}
</style>

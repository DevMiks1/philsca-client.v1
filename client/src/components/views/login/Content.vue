<template>
  <section class="bg-blue-darken-3 h-[100vh]">
    <v-container class="h-full py-0">
      <div class="flex flex-col justify-around h-full">
        <div class="content">
          <div>
            <h1 class="pb-5 text-[2rem] font-[600]">Philsca System</h1>
            <p>
              Hi Philsca, we encourage everyone to provide correct information.
              For further questions, please contact the administrator.
            </p>
          </div>
        </div>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-select
                :items="role"
                density="comfortable"
                label="Select Role"
                variant="outlined"
                v-model="loginStore.role"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email"
                type="email"
                v-model="loginStore.email"
                :rules="loginStateManagerStore.emailRules"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                class="-mt-8"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                :label="'Password'"
                :rules="loginStateManagerStore.passwordRules"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibility"
                variant="outlined"
                v-model="loginStore.password"
                class="-mt-5"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="mt-[4rem]">
            <v-btn
              @click.prevent="loginStore.handleLogin"
              :disabled="!isValidForm"
              block
              class="bg-orange-darken-3"
              type="submit"
              :loading="loginStore.isLoading"
              >login</v-btn
            >
          </div>
        </v-form>
      </div>
    </v-container>
  </section>
</template>

<script setup>
// ############################################################# import vue #############################################################
import { computed, ref } from "vue";
// ############################################################# import vue #############################################################

// ############################################################# ref #############################################################
const role = ref(["Admin", "Student", "Faculty", "Staff"]);
const showPassword = ref(false);
// ############################################################# ref #############################################################

// ############################################################# store #############################################################
import {
  useLoginStore,
  useLoginStateManagerStore,
} from "@/components/stores/index";
// ############################################################# store #############################################################

// ############################################################# invoke store #############################################################
const loginStore = useLoginStore();
const loginStateManagerStore = useLoginStateManagerStore();
// ############################################################# invoke store #############################################################

// ############################################################# invoke store #############################################################

const isValidForm = computed(() => {
  return (
    loginStateManagerStore.emailRules.every(
      (rule) => rule(loginStore.email) === true,
    ) &&
    loginStateManagerStore.passwordRules.every(
      (rule) => rule(loginStore.password) === true,
    )
  );
});
// ############################################################# invoke store #############################################################

// ############################################################# function #############################################################
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
// ############################################################# function #############################################################
</script>

<style scoped>
@media (max-width: 600px) and (min-width: 300px) {
  .content {
    height: 25rem;
  }
}
</style>

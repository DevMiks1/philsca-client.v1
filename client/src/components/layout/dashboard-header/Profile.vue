<template>
  <v-row justify="end" no-gutters>
    <v-col cols="auto" class="py-0">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            size="45"
            color="blue"
            class="cursor-pointer"
          >
            <template v-if="personalInfo?.picture">
              <v-img
                :src="personalInfo?.picture"
                :alt="personalInfo?.firstName"
                cover
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center fill-height justify-center">
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </template>
            <template v-else>
              <v-icon icon="mdi-account-circle"></v-icon>
            </template>
          </v-avatar>
        </template>
        <v-card class="bg-blue-darken-3 mt-2 w-60 rounded-lg">
          <div class="border-bottom mb-3">
            <v-card-text class="py-0 pt-5"
              ><span class="text-[1rem]">{{
                `${personalInfo?.firstName || "EMPTY"}  ${personalInfo?.lastName || "EMPTY"}`
              }}</span></v-card-text
            >
            <v-card-subtitle class="pb-5">{{
              roleDetails.role === "admin"
                ? "Administrator"
                : roleDetails.role === "student"
                  ? "Student"
                  : roleDetails.role === "staff"
                    ? "Staff"
                    : roleDetails.role === "faculty"
                      ? "Faculty"
                      : ""
            }}</v-card-subtitle>
          </div>

          <v-list
            v-for="profileItem in profileItems"
            :key="profileItem.id"
            class="bg-blue-darken-3 my-0 px-0 py-0"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-list-item
                v-bind="props"
                :class="[
                  isHovering ? 'bg-blue-darken-2 rounded-lg text-white' : '',
                  'mx-2 my-0 px-2',
                ]"
                @click="() => navigate(profileItem.to)"
              >
                <div class="flex items-center">
                  <span class="text-[0.7rem]"
                    ><v-icon class="mr-3">{{ profileItem.icon }}</v-icon></span
                  >
                  <v-card-text class="px-0 py-0">{{
                    profileItem.title
                  }}</v-card-text>
                </div>
              </v-list-item>
            </v-hover>
          </v-list>
          <div class="border-top mt-3 py-2">
            <v-hover v-slot="{ isHovering, props }">
              <div
                :class="[
                  isHovering
                    ? 'bg-blue-darken-2 cursor-pointer rounded-lg text-white'
                    : '',
                  'mx-2 flex items-center px-2 py-3',
                ]"
                v-bind="props"
                @click="logout"
              >
                <span class="text-[0.7rem]"
                  ><v-icon class="mr-3">mdi-logout</v-icon></span
                >
                <v-card-text class="px-0 py-0" @click="logoutStore.handleLogout"
                  >Logout</v-card-text
                >
              </div>
            </v-hover>
          </div>
        </v-card>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
// vue
import { computed } from "vue";
// store
import { useLogoutStore, useAuthStore } from "@/components/stores";
// invoke store
const authStore = useAuthStore();
const logoutStore = useLogoutStore();
// json
import { profileItems } from "@/components/json/ProfileItems";

// function
const navigate = (to) => {
  router.push(to);
};

// computed
const personalInfo = computed(
  () => authStore.auth?.userDetailsId?.personalInfoId,
);
const userAccount = computed(
  () => authStore.auth?.userDetailsId?.userAccountId,
);
const roleDetails = computed(() => userAccount.value?.roleDetailsId);
</script>
<style scoped></style>

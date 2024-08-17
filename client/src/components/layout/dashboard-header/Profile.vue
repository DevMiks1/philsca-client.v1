<template>
  <v-row justify="end">
    <v-col cols="auto">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            size="40"
            color="grey lighten-2"
            class="cursor-pointer"
          >
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John Doe"
            />
          </v-avatar>
        </template>
        <v-card class="w-60 mt-2 bg-blue-darken-3 rounded-lg">
          <div class="border-bottom mb-3">
            <v-card-text class="py-0 pt-5"
              ><span class="text-[1rem]">{{`${personalInfo.firstName || 'EMPTY'}  ${personalInfo.lastName || 'EMPTY'}`}}</span></v-card-text
            >
            <v-card-subtitle class="pb-5"
              >{{roleDetails.role === 'admin' ? 'Administrator' : ''}}</v-card-subtitle
            >
          </div>

          <v-list
            v-for="profileItem in profileItems"
            :key="profileItem.id"
            class="bg-blue-darken-3 py-0 px-0 my-0"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-list-item
                v-bind="props"
                :class="[
    
                  isHovering ? 'bg-blue-darken-2 text-white rounded-lg' : '',
                  ' px-2 mx-2 my-0',
                ]"
                @click="() => navigate(profileItem.to)"
              >
                <div class="flex items-center">
                  <span class="text-[0.7rem]"
                    ><v-icon class="mr-3">{{
                      profileItem.icon
                    }}</v-icon></span
                  >
                  <v-card-text class="py-0 px-0">{{ profileItem.title }}</v-card-text>
                </div>
              </v-list-item>
            </v-hover>
          </v-list>
          <div class="border-top py-2 mt-3">
            <v-hover v-slot="{ isHovering, props }">
            <div :class="[isHovering ? 'bg-blue-darken-2 text-white rounded-lg cursor-pointer' : '', 'flex items-center px-2 mx-2 py-3']" v-bind="props" @click="logout">
              <span class="text-[0.7rem]"
                ><v-icon class="mr-3">mdi-logout</v-icon></span
              >
              <v-card-text class="py-0 px-0" @click="handleLogout">Logout</v-card-text>
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

import { useLogoutStore, useAuthStore } from "@/components/stores";

const authStore = useAuthStore()
const logoutStore = useLogoutStore()
import { profileItems } from "@/components/json/ProfileItems";

const personalInfo = authStore.auth?.personalInfoId || ''
const userAccountId = authStore.auth?.userAccountId || ''
const roleDetails = userAccountId?.roleDetailsId || ''

const navigate = (to) => {
  router.push(to);
}
const handleLogout = () => {
  logoutStore.handleLogout()
}

</script>
<style scoped>
.border-bottom {
  border-bottom: 1px solid #ffffff14;
}
.border-top {
  border-top: 1px solid #ffffff14;
}
</style>
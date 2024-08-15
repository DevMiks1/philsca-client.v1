<template>
  <v-navigation-drawer v-model="isSidebarOpen" class="bg-blue-darken-3">
    <div class=" border-b  px-5 py-5 ">

      <div class="border-bottom">
        <!-- <v-card-text class="py-0"
              ><span class="text-[1rem] text-uppercase">owtosked</span></v-card-text
            > -->
        <p class="text-[1.5rem]  text-uppercase">philsca</p>
        <p>Administrator</p>
      </div>

    </div>
    <v-list v-for="(adminSidebarItem, index) in adminSidebarItems" :key="adminSidebarItem.icon" class="py-1">
      <v-hover v-slot="{ isHovering, props }">
        <v-list-item v-bind="props" :prepend-icon="adminSidebarItem.icon" :title="adminSidebarItem.title" link :class="[
          selectedItem === index ? 'bg-blue-darken-2 text-white rounded-lg' : '',
          isHovering ? ' bg-blue-darken-2 text-white rounded-lg' : '', 'px-2 mx-2 my-0']"
          @click="() => navigate(adminSidebarItem.to, index)"></v-list-item>
      </v-hover>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
// ############################################################## import vue #############################################################
import { ref, onMounted } from "vue";
// ############################################################## import vue #############################################################

// ############################################################## import router #############################################################
import { useRouter, useRoute } from "vue-router";
// ############################################################## import router #############################################################

// ############################################################## json #############################################################
import { adminSidebarItems } from "@/components/json/dashboard/SidebarItems";
// ############################################################## json #############################################################

// ############################################################## helper #############################################################
import { isSidebarOpen } from "@/components/helper/ToggleSidebar";
// ############################################################## helper #############################################################

// ############################################################## router #############################################################
const router = useRouter();
const route = useRoute();
// ############################################################## router #############################################################

// ############################################################## ref #############################################################
const selectedItem = ref(0);
// ############################################################## ref #############################################################

// ############################################################## function #############################################################
const navigate = (to, index) => {
  selectedItem.value = index;
  router.push(to);
};
// ############################################################## function #############################################################

// ############################################################## lifecycle hooks #############################################################
onMounted(() => {
  const currentRoute = route.path;
  const index = adminSidebarItems.findIndex((item) => item.to === currentRoute);
  if (index !== -1) {
    selectedItem.value = index;
  } else {
    selectedItem.value = 0; // Default to the first item
  }
});
// ############################################################## lifecycle hooks #############################################################
</script>

<style>
/* Add any custom styles for the sidebar here */
</style>
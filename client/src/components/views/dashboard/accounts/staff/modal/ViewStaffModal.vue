<template>
  <v-dialog v-model="viewStaffStore.isViewStaffModalOpen" transition="dialog-bottom-transition" max-width="500">
    <v-card v-if="viewStaffStore.isViewStaffModalOpen" class="y-axis-scrollbar">
      <div>
        <v-card-item class="bg-orange-darken-3">
          <v-card-title>Staff Details Overview</v-card-title>

          <v-card-subtitle>PHILSCA PHILIPPINES</v-card-subtitle>
        </v-card-item>
        <v-card-item class="border-b-sm mb-5">
          <v-card-title>Reference ID</v-card-title>

          <v-card-subtitle>{{ viewStaffDetails._id }}</v-card-subtitle>
        </v-card-item>
        <div class="d-flex ">
          <v-chip class="ml-4 mb-5 font-weight-bold text-uppercase " color="primary" label>
            personal details
          </v-chip>

          <v-chip class="ml-6 mb-5 font-weight-bold text-uppercase" label color="primary">
            philsca Philippines
          </v-chip>
        </div>
        <v-container>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Staff ID</p>
            <p class="w-[65%] text-[.900rem] font-[400] text-uppercase">{{ viewStaffDetails.schoolId || 'EMPTY' }}</p>


          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Name</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ `${viewStaffDetails.firstName} ${viewStaffDetails.middleName}
              ${viewStaffDetails.lastName} ${viewStaffDetails.suffix} `|| 'EMPTY'}}</p>


          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Birthdate</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.formattedBirthDate || 'EMPTY' }}</p>


          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Position</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.position || 'EMPTY' }}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Designation</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.designation || 'EMPTY' }}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">HGT</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.hgt || 'EMPTY' }}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">WGT</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.wgt || 'EMPTY' }}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">SSS</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.sss || 'EMPTY' }}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">TIN</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.tin || 'EMPTY' }}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Contact Number</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.contactNumber || 'EMPTY' }}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">ContactPerson</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.contactPerson || 'EMPTY' }}</p>
          </div>
          <div class="flex ">
            <p class="w-[35%] text-[.950rem] font-[500] ">Address</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.address || 'EMPTY' }}</p>
          </div>
        </v-container>
        <div class="d-flex border-t-sm pt-5">
          <v-chip class="ml-4 mb-5 font-weight-bold text-uppercase " color="primary" label>
            Credential details
          </v-chip>

          <v-chip class="ml-6 mb-5 font-weight-bold text-uppercase" label color="primary">
            philsca Philippines
          </v-chip>
        </div>
        <v-container>
          <div class="flex ">
            <p class="w-[35%] text-[.950rem] font-[500] ">Email</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.email || 'EMPTY' }}</p>
          </div>
          <div class="flex ">
            <p class="w-[35%] text-[.950rem] font-[500] ">Password</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{ viewStaffDetails.password || 'EMPTY' }}</p>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
// import components
import {
  useViewStaffStore,
} from "@/components/stores/index";
import { computed, watch } from "vue";
const viewStaffStore = useViewStaffStore();

const viewStaffDetails = computed(() => viewStaffStore.viewStaffDetails);

</script>

<style scoped></style>
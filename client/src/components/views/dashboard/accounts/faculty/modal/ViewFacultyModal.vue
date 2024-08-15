<template>
    <v-dialog v-model="viewFacultyStore.isViewFacultyModalOpen" transition="dialog-bottom-transition" max-width="500">
      <v-card v-if="viewFacultyStore.isViewFacultyModalOpen" class="y-axis-scrollbar">
        <div>
          <v-card-item class="bg-orange-darken-3">
            <v-card-title>Faculty Details Overview</v-card-title>
  
            <v-card-subtitle>PHILSCA PHILIPPINES</v-card-subtitle>
          </v-card-item>
          <v-card-item class="border-b-sm mb-5">
            <v-card-title>Reference ID</v-card-title>
  
            <v-card-subtitle>{{ viewFacultyDetails._id }}</v-card-subtitle>
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
              <p class="w-[35%] text-[.950rem] font-[500]">Faculty ID</p>
              <p class="w-[65%] text-[.900rem] font-[400] text-uppercase">{{ viewFacultyDetails.schoolId || 'EMPTY' }}</p>
  
  
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">Name</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ `${viewFacultyDetails.firstName} ${viewFacultyDetails.middleName}
                ${viewFacultyDetails.lastName} ${viewFacultyDetails.suffix} `|| 'EMPTY'}}</p>
  
  
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">Birthdate</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.formattedBirthDate || 'EMPTY' }}</p>
  
  
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">Position</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.position || 'EMPTY' }}</p>
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">Designation</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.designation || 'EMPTY' }}</p>
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">HGT</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.hgt || 'EMPTY' }}</p>
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">WGT</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.wgt || 'EMPTY' }}</p>
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">SSS</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.sss || 'EMPTY' }}</p>
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">TIN</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.tin || 'EMPTY' }}</p>
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">Contact Number</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.contactNumber || 'EMPTY' }}</p>
            </div>
            <div class="flex">
              <p class="w-[35%] text-[.950rem] font-[500]">ContactPerson</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.contactPerson || 'EMPTY' }}</p>
            </div>
            <div class="flex ">
              <p class="w-[35%] text-[.950rem] font-[500] ">Address</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.address || 'EMPTY' }}</p>
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
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.email || 'EMPTY' }}</p>
            </div>
            <div class="flex ">
              <p class="w-[35%] text-[.950rem] font-[500] ">Password</p>
              <p class="w-[65%] text-[.900rem] font-[400]">{{ viewFacultyDetails.password || 'EMPTY' }}</p>
            </div>
          </v-container>
        </div>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  // import components
  import {
    useViewFacultyStore,
  } from "@/components/stores/index";
  import { computed } from "vue";
  const viewFacultyStore = useViewFacultyStore();
  
  const viewFacultyDetails = computed(() => viewFacultyStore.viewFacultyDetails);
  
  </script>
  
  <style scoped></style>
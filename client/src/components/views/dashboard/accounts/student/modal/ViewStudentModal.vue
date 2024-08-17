<template>
  <v-dialog
    v-model="viewStudentStore.isViewStudentModalOpen"
    transition="dialog-bottom-transition"
    max-width="500"
  >
    <v-card
      v-if="viewStudentStore.isViewStudentModalOpen"
      class="y-axis-scrollbar"
    >
      <div>
        <v-card-item class="bg-orange-darken-3">
          <v-card-title>Student Details Overview</v-card-title>

          <v-card-subtitle>PHILSCA PHILIPPINES</v-card-subtitle>
        </v-card-item>
        <v-card-item class="border-b-sm mb-5">
          <v-card-title>Reference ID</v-card-title>

          <v-card-subtitle>{{viewStudentDetails._id }}</v-card-subtitle>
        </v-card-item>
        <div class="d-flex">
          <v-chip
            class="font-weight-bold text-uppercase mb-5 ml-4"
            color="primary"
            label
          >
            personal details
          </v-chip>

          <v-chip
            class="font-weight-bold text-uppercase mb-5 ml-6"
            label
            color="primary"
          >
            philsca Philippines
          </v-chip>
        </div>
        <v-container>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Student ID</p>
            <p class="w-[65%] text-[.900rem] font-[400] text-uppercase">{{role.schoolId || 'EMPTY'}}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Name</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{`${personalInfo.firstName || 'EMPTY'} ${personalInfo.middleName || 'EMPTY'} ${personalInfo.lastName || 'EMPTY'} ${personalInfo.suffix} `|| 'EMPTY'}}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Birthdate</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{personalInfo.birthDate || 'EMPTY'}}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Course</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{viewStudentDetails.course || 'EMPTY'}}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Schoolyear</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{viewStudentDetails.schoolYear || 'EMPTY'}}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Contact Number</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{personalInfo.contactNumber || 'EMPTY'}}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">ContactPerson</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{personalInfo.contactPerson || 'EMPTY'}}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">ContactPerson #</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{personalInfo.contactPersonNumber || 'EMPTY'}}</p>
          </div>  
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Address</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{personalInfo.address || 'EMPTY'}}</p>
          </div>
        </v-container>
        <div class="d-flex border-t-sm pt-5">
          <v-chip
            class="font-weight-bold text-uppercase mb-5 ml-4"
            color="primary"
            label
          >
            Credential details
          </v-chip>

          <v-chip
            class="font-weight-bold text-uppercase mb-5 ml-6"
            label
            color="primary"
          >
            philsca Philippines
          </v-chip>
        </div>
        <v-container>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Email</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{userAccount.email || 'EMPTY'}}</p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Password</p>
            <p class="w-[65%] text-[.900rem] font-[400]">{{userAccount.password || 'EMPTY'}}</p>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
// import components
import { useViewStudentStore } from "@/components/stores/index";
import { computed, watch } from "vue";
const viewStudentStore = useViewStudentStore();

const viewStudentDetails = computed(() => viewStudentStore.viewStudentDetails);
const personalInfo = computed(() => viewStudentDetails.value?.userDetailsId?.personalInfoId)
const userAccount = computed(() => viewStudentDetails.value?.userDetailsId?.userAccountId)
const role = computed(() => userAccount.value?.roleDetailsId)

</script>

<style scoped></style>

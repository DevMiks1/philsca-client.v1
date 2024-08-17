<template>
  <v-dialog
    v-model="viewFacultyStore.isViewFacultyModalOpen"
    transition="dialog-bottom-transition"
    max-width="500"
  >
    <v-card
      v-if="viewFacultyStore.isViewFacultyModalOpen"
      class="y-axis-scrollbar"
    >
      <div>
        <v-card-item class="bg-orange-darken-3">
          <v-card-title>Faculty Details Overview</v-card-title>

          <v-card-subtitle>PHILSCA PHILIPPINES</v-card-subtitle>
        </v-card-item>
        <v-card-item class="border-b-sm mb-5">
          <v-card-title>Reference ID</v-card-title>

          <v-card-subtitle>{{ viewFacultyDetails._id }}</v-card-subtitle>
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
            <p class="w-[35%] text-[.950rem] font-[500]">Staff ID</p>
            <p class="text-uppercase w-[65%] text-[.900rem] font-[400]">
              {{ role.schoolId || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Name</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{
                `${personalInfo.firstName || "EMPTY"} ${personalInfo.middleName || "EMPTY"}
              ${personalInfo.lastName || "EMPTY"} ${personalInfo.suffix || "EMPTY"} ` ||
                "EMPTY"
              }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Birthdate</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personalInfo.birthDate || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Position</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personnelDetails.position || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Designation</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personnelDetails.designation || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">HGT</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personnelDetails.hgt || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">WGT</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personnelDetails.wgt || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">SSS</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personnelDetails.sss || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">TIN</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personnelDetails.tin || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Contact Number</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personalInfo.contactNumber || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">ContactPerson</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personalInfo.contactPerson || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">ContactPerson #</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personalInfo.contactPersonNumber || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Address</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ personalInfo.address || "EMPTY" }}
            </p>
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
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ userAccount.email || "EMPTY" }}
            </p>
          </div>
          <div class="flex">
            <p class="w-[35%] text-[.950rem] font-[500]">Password</p>
            <p class="w-[65%] text-[.900rem] font-[400]">
              {{ userAccount.password || "EMPTY" }}
            </p>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
// import components
import { useViewFacultyStore } from "@/components/stores/index";
import { computed } from "vue";
const viewFacultyStore = useViewFacultyStore();

const viewFacultyDetails = computed(() => viewFacultyStore.viewFacultyDetails);
const personnelDetails = computed(
  () => viewFacultyDetails.value?.personnelDetailsId,
);
const personalInfo = computed(
  () => viewFacultyDetails.value?.userDetailsId?.personalInfoId,
);
const userAccount = computed(
  () => viewFacultyDetails.value?.userDetailsId?.userAccountId,
);
const role = computed(() => userAccount.value?.roleDetailsId);
</script>

<style scoped></style>

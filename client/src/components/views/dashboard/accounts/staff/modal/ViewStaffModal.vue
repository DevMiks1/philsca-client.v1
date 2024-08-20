<template>
  <v-dialog
    v-model="viewStaffStore.isViewStaffModalOpen"
    transition="dialog-bottom-transition"
    max-width="500"
  >
    <v-card v-if="viewStaffStore.isViewStaffModalOpen" class="y-axis-scrollbar">
      <div>
        <v-card-item class="bg-orange-darken-3">
          <v-card-title class="_overview">Staff Details Overview</v-card-title>

          <v-card-subtitle class="_overview-sub"
            >PHILSCA PHILIPPINES</v-card-subtitle
          >
        </v-card-item>
        <v-card-item class="border-b-sm mb-5">
          <v-card-title class="_reference">Reference ID</v-card-title>

          <v-card-subtitle>{{ viewStaffDetails._id }}</v-card-subtitle>
        </v-card-item>
        <div class="_chip-parent flex gap-2 sm:gap-5">
          <v-chip
            class="font-weight-bold text-uppercase mb-5 ml-3"
            color="primary"
            label
          >
            <p class="_chip sm:text-[1rem]">personal details</p>
          </v-chip>

          <v-chip
            class="font-weight-bold text-uppercase mb-5"
            label
            color="primary"
          >
            <p class="_chip sm:text-[1rem]">philsca Philippines</p>
          </v-chip>
        </div>
        <v-container>
          <div class="_flex-item-card flex">
            <p class="w-[50%] text-[.950rem] font-[500] sm:w-[45%]">Staff ID</p>
            <p
              class="text-uppercase w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ role.schoolId || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              Name
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{
                `${capitalizeFirstLetter(personalInfo.firstName) || "EMPTY"}
              ${capitalizeFirstLetter(personalInfo.middleName) || "EMPTY"}
              ${capitalizeFirstLetter(personalInfo.lastName) || "EMPTY"} ${
                capitalizeFirstLetter(personalInfo.suffix) || "EMPTY"
              } ` || "EMPTY"
              }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              Birthdate
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ personalInfo.birthDate || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              Position
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ capitalizeFirstLetter(personnelDetails.position) || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              Designation
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{
                capitalizeFirstLetter(personnelDetails.designation) || "EMPTY"
              }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              HGT
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ personnelDetails.hgt || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              WGT
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ personnelDetails.wgt || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              SSS
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ personnelDetails.sss || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              TIN
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ personnelDetails.tin || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              Contact Number
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ personalInfo.contactNumber || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              ContactPerson
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ capitalizeFirstLetter(personalInfo.contactPerson) || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              ContactPerson #
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ personalInfo.contactPersonNumber || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              Address
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ capitalizeFirstLetter(personalInfo.address) || "EMPTY" }}
            </p>
          </div>
        </v-container>
        <div class="_chip-parent border-t-sm flex gap-2 pt-5">
          <v-chip
            class="font-weight-bold text-uppercase mb-5 ml-3"
            color="primary"
            label
          >
            <p class="_chip sm:text-[1rem]">Credential details</p>
          </v-chip>

          <v-chip
            class="font-weight-bold text-uppercase mb-5"
            label
            color="primary"
          >
            <p class="_chip sm:text-[1rem]">philsca Philippines</p>
          </v-chip>
        </div>
        <v-container>
          <div class="_credentials flex">
            <p class="w-[50%] text-[.950rem] font-[500] sm:w-[35%]">Email</p>
            <p class="w-[50%] text-[.900rem] font-[400] sm:w-[65%]">
              {{ userAccount.email || "EMPTY" }}
            </p>
          </div>
          <div class="_credentials flex">
            <p class="w-[50%] text-[.950rem] font-[500] sm:w-[35%]">Password</p>
            <p class="w-[50%] text-[.900rem] font-[400] sm:w-[65%]">
              {{ userAccount.password || "EMPTY" }}
            </p>
          </div>
        </v-container>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
// vue
import { computed } from "vue";
// utility
import { capitalizeFirstLetter } from "@/components/utility/capitalizeFirstLetter";
// store
import { useViewStaffStore } from "@/components/stores/index";
// invoke store
const viewStaffStore = useViewStaffStore();
// computed
const viewStaffDetails = computed(() => viewStaffStore.viewStaffDetails);
const personnelDetails = computed(
  () => viewStaffDetails.value?.personnelDetailsId,
);
const personalInfo = computed(
  () => viewStaffDetails.value?.userDetailsId?.personalInfoId,
);
const userAccount = computed(
  () => viewStaffDetails.value?.userDetailsId?.userAccountId,
);
const role = computed(() => userAccount.value?.roleDetailsId);
</script>

<style scoped></style>

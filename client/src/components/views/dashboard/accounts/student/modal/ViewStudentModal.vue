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
          <v-card-title class="_overview"
            >Student Details Overview</v-card-title
          >

          <v-card-subtitle class="_overview-sub"
            >PHILSCA PHILIPPINES</v-card-subtitle
          >
        </v-card-item>
        <v-card-item class="border-b-sm mb-5">
          <v-card-title class="_reference">Reference ID</v-card-title>

          <v-card-subtitle>{{ viewStudentDetails._id }}</v-card-subtitle>
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
            <p class="w-[50%] text-[.950rem] font-[500] sm:w-[45%]">
              Student ID
            </p>
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
              ${capitalizeFirstLetter(personalInfo.lastName) || "EMPTY"} ${capitalizeFirstLetter(personalInfo.suffix)}
              ` || "EMPTY"
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
              Course
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ viewStudentDetails.course || "EMPTY" }}
            </p>
          </div>
          <div class="_flex-item-card flex">
            <p
              class="_child-item-card w-[50%] text-[.950rem] font-[500] sm:w-[45%]"
            >
              Schoolyear
            </p>
            <p
              class="_child-item-card w-[50%] text-[.900rem] font-[400] sm:w-[55%]"
            >
              {{ viewStudentDetails.schoolYear || "EMPTY" }}
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
import { useViewStudentStore } from "@/components/stores/index";
// invoke store
const viewStudentStore = useViewStudentStore();
// computed
const viewStudentDetails = computed(() => viewStudentStore.viewStudentDetails);
const personalInfo = computed(
  () => viewStudentDetails.value?.userDetailsId?.personalInfoId,
);
const userAccount = computed(
  () => viewStudentDetails.value?.userDetailsId?.userAccountId,
);
const role = computed(() => userAccount.value?.roleDetailsId);
</script>

<style scoped></style>

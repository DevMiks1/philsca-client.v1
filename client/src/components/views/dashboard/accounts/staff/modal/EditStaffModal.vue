<template>
  <div>
    <v-dialog
      v-model="editStaffStore.isEditStaffModalOpen"
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="editStaffStore.isEditStaffModalOpen"
        max-width="550px"
        max-height="600px"
        class="y-axis-scrollbar mx-auto"
      >
        <div class="bg-blue-darken-3 flex items-center px-3 py-3">
          <p class="text-[1.3rem] font-[500]">Edit Account</p>
          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            size="small"
            @click="editStaffStore.handleCloseEditStaffModal(false)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <v-container class="fluid">
          <v-form @submit.prevent="editStaffStore.handleEditStaff">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editStaffStore.firstName"
                  label="Firstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem] sm:-mt-[0rem]">
                  <v-text-field
                    v-model="editStaffStore.lastName"
                    label="Lastname"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.middleName"
                    label="Middlename"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.suffix"
                    label="Suffix"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.position"
                    label="Position"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.designation"
                    label="Designation"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.hgt"
                    label="HGT"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.wgt"
                    label="WGT"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.sss"
                    label="SSS"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.tin"
                    label="TIN"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.birthDate"
                    label="Datebirth"
                    type="date"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.contactNumber"
                    :rules="accountStateManagerStore.contactNumberRules"
                    label="Contact Number"
                    prefix="+63"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1.2rem]">
                  <v-text-field
                    v-model="editStaffStore.contactPerson"
                    label="ContactPerson"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.contactPersonNumber"
                    :rules="accountStateManagerStore.contactNumberRules"
                    prefix="+63"
                    label="ContactPerson #"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editStaffStore.address"
                    label="Address"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              block
              class="bg-orange-darken-3"
              :loading="editStaffStore.isLoading"
              :disabled="!isValidForm"
              >Edit</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// vue
import { computed, watch } from "vue";
// store
import {
  useEditStaffStore,
  useRetrieveStaffStore,
  useAccountStateManagerStore,
} from "@/components/stores/index";

// invoke store
const editStaffStore = useEditStaffStore();
const retrieveStaffStore = useRetrieveStaffStore();
const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
  return (
    accountStateManagerStore.contactNumberRules.every(
      (rule) => rule(editStaffStore.contactNumber) === true,
    ) &&
    accountStateManagerStore.contactNumberRules.every(
      (rule) => rule(editStaffStore.contactPersonNumber) === true,
    )
  );
});
// watch
watch(
  () => editStaffStore.idToEdit,
  (id) => {
    const staffToEdit =
      retrieveStaffStore.staffs.find((staff) => staff._id === id) || {};

    const personalInfo = staffToEdit?.userDetailsId?.personalInfoId;
    const personnelDetails = staffToEdit?.personnelDetailsId;
    const contactNumberSlice = personalInfo?.contactNumber
      ? personalInfo?.contactNumber.slice(3)
      : "";
    const contactPersonSlice = staffToEdit.contactPerson
      ? staffToEdit.contactPerson.slice(3)
      : "";
    const contactPersonNumberSlice = personalInfo?.contactPersonNumber
      ? personalInfo?.contactPersonNumber.slice(3)
      : "";

    editStaffStore.firstName = personalInfo.firstName || "";
    editStaffStore.lastName = personalInfo.lastName || "";
    editStaffStore.middleName = personalInfo.middleName || "";
    editStaffStore.position = personnelDetails.position || "";
    editStaffStore.designation = personnelDetails.designation || "";
    editStaffStore.hgt = personnelDetails.hgt || "";
    editStaffStore.wgt = personnelDetails.wgt || "";
    editStaffStore.sss = personnelDetails.sss || "";
    editStaffStore.tin = personnelDetails.tin || "";
    editStaffStore.contactPerson = contactPersonSlice || "";
    editStaffStore.contactPersonNumber = contactPersonNumberSlice || "";
    editStaffStore.address = personalInfo.address || "";
    editStaffStore.birthDate = personalInfo.birthDate || "";
    editStaffStore.contactNumber = contactNumberSlice || "";
  },
);
</script>

<style scoped></style>

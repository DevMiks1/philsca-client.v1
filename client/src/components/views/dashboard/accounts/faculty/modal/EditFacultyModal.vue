<template>
  <div>
    <v-dialog
      v-model="editFacultyStore.isEditFacultyModalOpen"
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="editFacultyStore.isEditFacultyModalOpen"
        max-width="550px"
        max-height="600px"
        class="y-axis-scrollbar mx-auto"
      >
        <div class="bg-blue-darken-3 flex items-center px-3 py-3">
          <p class="text-[1.1rem] font-[500] sm:text-[1.3rem]">Edit Account</p>
          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            size="small"
            @click="editFacultyStore.handleCloseEditFacultyModal(false)"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>

        <v-container fluid>
          <v-form @submit.prevent="editFacultyStore.handleEditFaculty">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editFacultyStore.firstName"
                  label="Firstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem] sm:-mt-[0rem]">
                  <v-text-field
                    v-model="editFacultyStore.lastName"
                    label="Lastname"
                  ></v-text-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.middleName"
                    label="Middlename"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.suffix"
                    label="Suffix"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.position"
                    label="Position"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.designation"
                    label="Designation"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.hgt"
                    label="HGT"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.wgt"
                    label="WGT"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.sss"
                    label="SSS"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.tin"
                    label="TIN"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1rem]">
                  <v-text-field
                    v-model="editFacultyStore.birthDate"
                    label="Datebirth"
                    type="date"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="-mt-[1.8rem]">
                  <v-text-field
                    v-model="editFacultyStore.contactNumber"
                    :rules="accountStateManagerStore.contactNumberRules"
                    label="Contact Number"
                    prefix="+63"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="-mt-[1.2rem]">
                  <v-text-field
                    v-model="editFacultyStore.contactPerson"
                    label="ContactPerson"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-text-field
                    v-model="editFacultyStore.contactPersonNumber"
                    :rules="accountStateManagerStore.contactNumberRules"
                    prefix="+63"
                    label="ContactPerson #"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="-mt-[1.8rem]">
                  <v-text-field
                    v-model="editFacultyStore.address"
                    label="Address"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              block
              class="bg-orange-darken-3"
              :loading="editFacultyStore.isLoading"
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
  useEditFacultyStore,
  useRetrieveFacultyStore,
  useAccountStateManagerStore,
} from "@/components/stores/index";

// invoke store
const editFacultyStore = useEditFacultyStore();
const retrieveFacultyStore = useRetrieveFacultyStore();
const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
  return (
    accountStateManagerStore.contactNumberRules.every(
      (rule) => rule(editFacultyStore.contactNumber) === true,
    ) &&
    accountStateManagerStore.contactNumberRules.every(
      (rule) => rule(editFacultyStore.contactPersonNumber) === true,
    )
  );
});
// watch
watch(
  () => editFacultyStore.idToEdit,
  (id) => {
    const facultyToEdit =
      retrieveFacultyStore.faculties.find((faculty) => faculty._id === id) ||
      {};

    const personalInfo = facultyToEdit?.userDetailsId?.personalInfoId;
    const personnelDetails = facultyToEdit?.personnelDetailsId;
    const contactNumberSlice = personalInfo?.contactNumber
      ? personalInfo?.contactNumber.slice(3)
      : "";
    const contactPersonSlice = facultyToEdit.contactPerson
      ? facultyToEdit.contactPerson.slice(3)
      : "";
    const contactPersonNumberSlice = personalInfo?.contactPersonNumber
      ? personalInfo?.contactPersonNumber.slice(3)
      : "";

    editFacultyStore.firstName = personalInfo.firstName || "";
    editFacultyStore.lastName = personalInfo.lastName || "";
    editFacultyStore.middleName = personalInfo.middleName || "";
    editFacultyStore.position = personnelDetails.position || "";
    editFacultyStore.designation = personnelDetails.designation || "";
    editFacultyStore.hgt = personnelDetails.hgt || "";
    editFacultyStore.wgt = personnelDetails.wgt || "";
    editFacultyStore.sss = personnelDetails.sss || "";
    editFacultyStore.tin = personnelDetails.tin || "";
    editFacultyStore.contactPerson = contactPersonSlice || "";
    editFacultyStore.contactPersonNumber = contactPersonNumberSlice || "";
    editFacultyStore.address = personalInfo.address || "";
    editFacultyStore.birthDate = personalInfo.birthDate || "";
    editFacultyStore.contactNumber = contactNumberSlice || "";
  },
);
</script>

<style scoped></style>

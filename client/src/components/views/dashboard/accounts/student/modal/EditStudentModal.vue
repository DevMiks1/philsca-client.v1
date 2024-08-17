<template>
  <div>
    <v-dialog
      v-model="editStudentStore.isEditStudentModalOpen"
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="editStudentStore.isEditStudentModalOpen"
        max-width="500px"
        max-height="600px"
        class="y-axis-scrollbar mx-auto"
      >
        <v-container>
          <div class="flex">
            <p class="text-[1.3rem] font-[500]">Edit Account</p>
            <v-spacer></v-spacer>
            <v-btn
              variant="tonal"
              @click="editStudentStore.handleCloseEditStudentModal(false)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
        </v-container>
        <v-card-text>
          <v-form @submit.prevent="editStudentStore.handleEditEmployee">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editStudentStore.firstName"
                  label="Firstname"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                  <div class="-mt-[1.7rem] sm:-mt-[0rem]">
                  <v-text-field
                    v-model="editStudentStore.lastName"
                    label="Lastname"
                  ></v-text-field>
                </div>
                </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-text-field
                    v-model="editStudentStore.middleName"
                    label="Middlename"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-text-field
                    v-model="editStudentStore.suffix"
                    label="Suffix"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-select
                    :items="course"
                    density="comfortable"
                    label="Select Course"
                    v-model="editStudentStore.course"
                  ></v-select>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-select
                    :items="schoolYear"
                    density="comfortable"
                    label="Select Schoolyear"
                    v-model="editStudentStore.schoolYear"
                  ></v-select>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-text-field
                    v-model="editStudentStore.birthDate"
                    label="Datebirth"
                    type="date"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-text-field
                    v-model="editStudentStore.contactNumber"
                    :rules="accountStateManagerStore.contactNumberRules"
                    label="Contact Number"
                    prefix="+63"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-text-field
                    v-model="editStudentStore.contactPerson"
                    label="ContactPerson"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="-mt-8">
                <div>
                  <v-text-field
                    v-model="editStudentStore.contactPersonNumber"
                    :rules="accountStateManagerStore.contactNumberRules"
                    prefix="+63"
                    label="ContactPerson #"
                  ></v-text-field>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="-mt-[1.8rem]">
                  <v-text-field
                    v-model="editStudentStore.address"
                    label="Address"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn
                type="submit"
                block
                class="bg-orange-darken-3"
                :loading="editStudentStore.isLoading"
                :disabled="!isValidForm"
                >Edit</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// vue
import { computed, ref, watch } from "vue";
// store
import {
  useEditStudentStore,
  useRetrieveStudentStore,
  useAccountStateManagerStore,
} from "@/components/stores/index";

// invoke store
const editStudentStore = useEditStudentStore();
const retrieveStudentStore = useRetrieveStudentStore();
const accountStateManagerStore = useAccountStateManagerStore();
// ref
const course = ref(["BSIT", "BSAE", "BSAT", "BSAMT", "BSAET"]);
const schoolYear = ref(["1st", "2nd", "3rd", "4th"]);

// computed
const isValidForm = computed(() => {
  return (
    accountStateManagerStore.contactNumberRules.every(
      (rule) => rule(editStudentStore.contactNumber) === true,
    ) &&
    accountStateManagerStore.contactNumberRules.every(
      (rule) => rule(editStudentStore.contactPersonNumber) === true,
    )
  );
});
// watch
watch(
  () => editStudentStore.idToEdit,
  (id) => {
    const studentToEdit =
      retrieveStudentStore.students.find((student) => student._id === id) || {};

    const personalInfo = studentToEdit?.userDetailsId?.personalInfoId;
    const contactNumberSlice = personalInfo?.contactNumber
      ? personalInfo?.contactNumber.slice(3)
      : "";
    const contactPersonNumberSlice = personalInfo?.contactPersonNumber
      ? personalInfo?.contactPersonNumber.slice(3)
      : "";
    editStudentStore.firstName = personalInfo?.firstName || "";
    editStudentStore.lastName = personalInfo?.lastName || "";
    editStudentStore.middleName = personalInfo?.middleName || "";
    editStudentStore.suffix = personalInfo?.suffix || "";
    editStudentStore.course = studentToEdit.course || "";
    editStudentStore.schoolYear = studentToEdit.schoolYear || "";
    editStudentStore.contactPerson = personalInfo?.contactPerson || "";
    editStudentStore.contactPersonNumber = contactPersonNumberSlice || "";
    editStudentStore.address = personalInfo?.address || "";
    editStudentStore.birthDate = personalInfo?.birthDate || "";
    editStudentStore.contactNumber = contactNumberSlice || "";
  },
);
</script>

<style scoped></style>

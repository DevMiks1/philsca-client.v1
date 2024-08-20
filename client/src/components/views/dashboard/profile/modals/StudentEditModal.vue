<template>
  <div>
    <v-dialog
      v-model="profileStore.isStudentEditModalOpen"
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="profileStore.isStudentEditModalOpen"
        max-width="500px"
        max-height="600px"
        class="y-axis-scrollbar mx-auto"
      >
        <div class="bg-blue-darken-3 flex items-center px-3 py-3">
          <p class="text-[1.1rem] font-[500] sm:text-[1.3rem]">Edit Profile</p>
          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            size="small"
            @click="
              profileStore.hancleCloseProfileModal(false, roleDetails?.role)
            "
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="relative pt-[1rem] text-center">
          <v-avatar size="120" color="info" class="avatar-no-overflow">
            <template v-if="editStudentStore.picture">
              <v-img
                alt="John"
                class="rounded-circle"
                :src="editStudentStore.picture || profileStore.images[0]"
              ></v-img>
            </template>
            <template v-else>
              <v-icon icon="mdi-account-circle" size="100"></v-icon>
            </template>

            <div class="absolute bottom-0 left-[5rem]">
              <v-btn
                icon="mdi-pencil"
                size="x-small"
                class="bg-blue-lighten-1 text-white"
                @click="triggerFileInput"
              ></v-btn>
              <!-- <v-icon size="small">mdi-pencil</v-icon> -->
              <v-file-input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="d-none"
                @change="handleFileChange"
              />
            </div>
          </v-avatar>
        </div>
        <v-container class="fluid">
          <v-form @submit.prevent="profileStore.handleSubmit">
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

            <v-btn
              type="submit"
              block
              class="bg-orange-darken-3"
              :loading="profileStore.isLoading"
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
import { computed, ref, watch } from "vue";
// store
import {
  useAuthStore,
  useProfileStore,
  useEditAdminStore,
} from "@/components/stores";

// invoke store
const authStore = useAuthStore();
const profileStore = useProfileStore();
const editAdminStore = useEditAdminStore();
// ref
const course = ref(["BSIT", "BSAE", "BSAT", "BSAMT", "BSAET"]);
const schoolYear = ref(["1st", "2nd", "3rd", "4th"]);

const personalInfo = computed(
  () => authStore.auth?.userDetailsId?.personalInfoId,
);
const userAccount = computed(() => authStore.auth?.userDetailsId?.userAccountId);

const roleDetails = computed(() => userAccount.value?.roleDetailsId);

// store
import {
  useEditStudentStore,
  useRetrieveStudentStore,
  useAccountStateManagerStore,
} from "@/components/stores/index";

// invoke store
const editStudentStore = useEditStudentStore();
const accountStateManagerStore = useAccountStateManagerStore();
const fileInput = ref(null);

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click(); // Programmatically trigger the file input
  } else {
    console.error("File input reference is null");
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Set the preview URL in the store
      editStudentStore.picture = e.target.result;
      profileStore.images = [file]; // Store file objects
    };

    reader.readAsDataURL(file); // Convert the file to a base64 string
  }
};

// computed

// watch
watch(
  () => profileStore.idToEdit,
  (id) => {
    const profileToEdit = authStore.auth;

    const personalInfo = profileToEdit?.userDetailsId?.personalInfoId;
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
    editStudentStore.course = profileToEdit.course || "";
    editStudentStore.schoolYear = profileToEdit.schoolYear || "";
    editStudentStore.contactPerson = personalInfo?.contactPerson || "";
    editStudentStore.contactPersonNumber = contactPersonNumberSlice || "";
    editStudentStore.address = personalInfo?.address || "";
    editStudentStore.picture = personalInfo?.picture || "";
    editStudentStore.birthDate = personalInfo?.birthDate || "";
    editStudentStore.contactNumber = contactNumberSlice || "";
  },
);
</script>

<style scoped>
.avatar-no-overflow {
  overflow: visible;
}
</style>

<template>
  <div>
    <v-dialog
      v-model="profileStore.isStaffEditModalOpen"
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="profileStore.isStaffEditModalOpen"
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
            <template v-if="editStaffStore.picture">
              <v-img
                alt="John"
                class="rounded-circle"
                :src="editStaffStore.picture || profileStore.images[0]"
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


const personalInfo = computed(
  () => authStore.auth?.userDetailsId?.personalInfoId,
);
const userAccount = computed(
  () => authStore.auth?.userDetailsId?.userAccountId,
);

const roleDetails = computed(() => userAccount.value?.roleDetailsId);

// store
import {
  useEditStaffStore,
  useAccountStateManagerStore,
} from "@/components/stores/index";

// invoke store
const editStaffStore = useEditStaffStore();
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
      editStaffStore.picture = e.target.result;
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
    const personnelDetails = profileToEdit?.personnelDetailsId;
    const contactNumberSlice = personalInfo?.contactNumber
      ? personalInfo?.contactNumber.slice(3)
      : "";
    const contactPersonSlice = personalInfo.contactPerson
      ? personalInfo.contactPerson.slice(3)
      : "";
    const contactPersonNumberSlice = personalInfo?.contactPersonNumber
      ? personalInfo?.contactPersonNumber.slice(3)
      : "";

    editStaffStore.firstName = personalInfo?.firstName || "";
    editStaffStore.lastName = personalInfo?.lastName || "";
    editStaffStore.middleName = personalInfo?.middleName || "";
    editStaffStore.position = personnelDetails?.position || "";
    editStaffStore.designation = personnelDetails?.designation || "";
    editStaffStore.hgt = personnelDetails?.hgt || "";
    editStaffStore.wgt = personnelDetails?.wgt || "";
    editStaffStore.sss = personnelDetails?.sss || "";
    editStaffStore.tin = personnelDetails?.tin || "";
    editStaffStore.contactPerson = contactPersonSlice || "";
    editStaffStore.contactPersonNumber = contactPersonNumberSlice || "";
    editStaffStore.address = personalInfo?.address || "";
    editStaffStore.picture = personalInfo?.picture || "";
    editStaffStore.birthDate = personalInfo?.birthDate || "";
    editStaffStore.contactNumber = contactNumberSlice || "";
  },
);
</script>

<style scoped>
.avatar-no-overflow {
  overflow: visible;
}
</style>

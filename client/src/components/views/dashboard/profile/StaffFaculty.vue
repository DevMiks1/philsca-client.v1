<template>
    <div>
      <h2 class="pb-[2rem] text-[2rem] font-[500]">{{roleDetails?.role === 'staff' ? 'Staff Profile' : 'Faculty Profile'}}</h2>
  
      <v-card>
        <div class="y-axis-scrollbar mx-auto h-full">
          <v-row no-gutters>
            <v-col cols="12" sm="4" md="5" lg="3" class="px-0 py-0">
              <div
                class="_border-right flex h-full flex-col items-center justify-center px-[1rem] py-[2rem]"
              >
                <v-avatar size="120" rounded="0" color="info">
                  <template v-if="personalInfo?.picture">
                    <v-img
                      :alt="personalInfo?.firstName"
                      :src="personalInfo.picture"
                    >
                      <template v-slot:placeholder>
                        <div
                          class="d-flex align-center fill-height justify-center"
                        >
                          <v-progress-circular
                            color="grey-lighten-4"
                            indeterminate
                          ></v-progress-circular>
                        </div>
                      </template>
                    </v-img>
                  </template>
                  <template v-else>
                    <v-icon icon="mdi-account-circle" size="100"></v-icon>
                  </template>
                </v-avatar>
                <p class="text-ceter pb-5 pt-[1rem] text-[1.1rem] font-[500]">
                  {{
                    `${capitalizeFirstLetter(personalInfo?.firstName) || "N/A"} ${capitalizeFirstLetter(personalInfo?.lastName) || "N/A"}`
                  }}
                </p>
                <div class="w-[7rem]">
                  <v-btn
                    @click="
                      profileStore.handleToggleEditProfileModal(
                        true,
                        authStore.auth?._id,
                        roleDetails?.role,
                      )
                    "
                    class="w-100 bg-blue-darken-3"
                    size="small"
                    >Edit Profile</v-btn
                  >
                </div>
              </div>
            </v-col>
  
            <v-col sm="8" md="7" lg="9" class="px-0">
              <v-container>
                <div class="_chip-parent flex gap-2 pb-[1rem]">
                  <v-chip label color="primary">
                    <h2
                      class="_chip text-uppercase text-[1.1rem] font-[500] opacity-80 sm:text-[1rem]"
                    >
                      {{roleDetails?.role === 'staff' ? 'Staff Info' : 'Faculty Info'}}
                    </h2>
                  </v-chip>
                  
                </div>
                <div class="sm:pb-[2rem]">
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="3">
                      <div class="flex flex-col">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>{{roleDetails?.role === 'staff' ? 'Staff ID' : 'Faculty ID'}}</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{ roleDetails?.schoolId || "N/A" }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="3">
                      <div class="flex flex-col md:pb-[0rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>Position</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{ capitalizeFirstLetter(personnelDetails?.position) || "N/A" }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="3">
                      <div class="flex flex-col md:pb-[0rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>Designation</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{
                              capitalizeFirstLetter(personnelDetails?.designation) ||
                              "N/A"
                            }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="3">
                      <div class="flex flex-col md:pb-[0rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>Birthdate</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{
                              capitalizeFirstLetter(personalInfo?.birthDate) ||
                              "N/A"
                            }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <!-- Add more fields as needed -->
                  </v-row>
                </div>
                <div class="sm:pb-[2rem]">
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="3">
                      <div class="flex flex-col">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>HGT</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{ personnelDetails?.hgt || "N/A" }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="3">
                      <div class="flex flex-col md:pb-[0rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>WGT</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{ personnelDetails?.wgt || "N/A" }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="3">
                      <div class="flex flex-col md:pb-[0rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>TIN</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{
                              (personnelDetails?.tin) ||
                              "N/A"
                            }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="3">
                      <div class="flex flex-col md:pb-[0rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>SSS</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{
                            (personnelDetails?.sss) ||
                              "N/A"
                            }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <!-- Add more fields as needed -->
                  </v-row>
                </div>
  
                <div class="_chip-parent flex gap-2 pb-[1rem]">
                  <v-chip label color="primary">
                    <h2
                      class="_chip text-uppercase text-[1.1rem] font-[500] opacity-80 sm:text-[1rem]"
                    >
                      Emergency Info
                    </h2>
                  </v-chip>
                </div>
                <div class="sm:pb-[2rem]">
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="4">
                      <div class="flex flex-col pb-[1rem] md:pb-[0rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>Contact No.</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{ personalInfo?.contactNumber || "N/A" }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="4">
                      <div class="flex flex-col pb-[1rem] md:pb-[0rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>Contact Person</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{
                              capitalizeFirstLetter(
                                personalInfo?.contactPerson,
                              ) || "N/A"
                            }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" lg="4">
                      <div class="flex flex-col pb-[1rem]">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>Contact Person No.</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{ personalInfo?.contactPersonNumber || "N/A" }}
                          </p>
                        </div>
                      </div>
                    </v-col>
  
                    <!-- Add more fields as needed -->
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <div class="flex flex-col">
                        <div class="_flex-item-profile font-[500] opacity-80">
                          <p>Address</p>
                        </div>
                        <div class="_flex-item-profile font-[500]">
                          <p>
                            {{
                              capitalizeFirstLetter(personalInfo?.address) ||
                              "N/A"
                            }}
                          </p>
                        </div>
                      </div>
                    </v-col>
                    <!-- Add more fields as needed -->
                  </v-row>
                </div>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </template>
  
  <script setup>
  // vue
  import { computed } from "vue";
  // store
  import { useAuthStore, useProfileStore } from "@/components/stores";
  // helper
  import { capitalizeFirstLetter } from "@/components/utility/capitalizeFirstLetter";
  
  // invoke store
  const authStore = useAuthStore();
  const profileStore = useProfileStore();
  const studentDetails = computed(() => authStore.auth);
  const personalInfo = computed(
    () => authStore.auth?.userDetailsId?.personalInfoId,
  );
  const personnelDetails = computed(
    () => authStore.auth?.personnelDetailsId
  );
  const userAccount = computed(
    () => authStore.auth?.userDetailsId?.userAccountId,
  );
  const roleDetails = computed(() => userAccount.value?.roleDetailsId);
  
  const parsedDate = new Date(personalInfo.value.birthDate);
  
  // Verify if the date is valid
  if (!isNaN(parsedDate.getTime())) {
    // Format the date to a readable string
    personalInfo.value.birthDate = parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    personalInfo.value.birthDate = "Invalid date";
  }
  </script>
  
  <style scoped>
  ._border-right {
    border-right: 2px solid #26262927;
  }
  
  @media (max-width: 599px) {
    ._border-right {
      border-right: none;
    }
  }
  </style>
  
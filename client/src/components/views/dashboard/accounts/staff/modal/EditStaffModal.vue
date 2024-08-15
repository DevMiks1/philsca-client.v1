<template>
    <div>
        <v-dialog v-model="editStaffStore.isEditStaffModalOpen" transition="dialog-bottom-transition">
            <v-card v-if="editStaffStore.isEditStaffModalOpen" max-width="500px" max-height="600px"
                class="y-axis-scrollbar mx-auto">
                <v-container>
                    <div class="flex">
                        <p class="text-[1.3rem] font-[500]">Edit Account</p>
                        <v-spacer></v-spacer>
                        <v-btn variant="tonal"
                            @click="editStaffStore.handleCloseEditStaffModal(false)"><v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </v-container>
                <v-card-text>
                    <v-form @submit.prevent="editStaffStore.handleEditStaff">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editStaffStore.firstName" label="Firstname"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editStaffStore.lastName" label="Lastname"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.middleName"
                                        label="Middlename"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.suffix" label="Suffix"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.position" label="Position"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.designation"
                                        label="Designation"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.hgt" label="HGT"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.wgt" label="WGT"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.sss" label="SSS"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.tin" label="TIN"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.birthDate" label="Datebirth"
                                        type="date"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.contactNumber"
                                        :rules="accountStateManagerStore.contactNumberRules" label="Contact Number"
                                        prefix="+63"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="-mt-[1.2rem]">
                                    <v-text-field v-model="editStaffStore.contactPerson"
                                        :rules="accountStateManagerStore.contactNumberRules" prefix="+63"
                                        label="Contact Person"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editStaffStore.address" label="Address"></v-text-field>
                                </div>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-btn type="submit" block class="bg-orange-darken-3" :loading="editStaffStore.isLoading"
                                :disabled="!isValidForm">Edit</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
// vue
import { computed, watch } from "vue";
// store
import { useEditStaffStore, useRetrieveStaffStore, useAccountStateManagerStore } from "@/components/stores/index";

// invoke store
const editStaffStore = useEditStaffStore();
const retrieveStaffStore = useRetrieveStaffStore();
const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
    return (

        accountStateManagerStore.contactNumberRules.every(
            (rule) => rule(editStaffStore.contactNumber) === true
        )
    );
});
// watch
watch(
    () => editStaffStore.idToEdit,
    (id) => {
        console.log(id);
        const staffToEdit = retrieveStaffStore.staffs.find((staff) => staff._id === id) || {};
        const contactNumberSlice = staffToEdit.contactNumber ? staffToEdit.contactNumber.slice(3) : "";
        const contactPersonSlice = staffToEdit.contactPerson ? staffToEdit.contactPerson.slice(3) : "";
        editStaffStore.firstName = staffToEdit.firstName || "";
        editStaffStore.lastName = staffToEdit.lastName || "";
        editStaffStore.middleName = staffToEdit.middleName || "";
        editStaffStore.position = staffToEdit.position || "";
        editStaffStore.designation = staffToEdit.designation || "";
        editStaffStore.hgt = staffToEdit.hgt || "";
        editStaffStore.wgt = staffToEdit.wgt || "";
        editStaffStore.sss = staffToEdit.sss || "";
        editStaffStore.tin = staffToEdit.tin || "";
        editStaffStore.contactPerson = contactPersonSlice || "";
        editStaffStore.address = staffToEdit.address || "";
        editStaffStore.birthDate = staffToEdit.birthDate || "";
        editStaffStore.contactNumber = contactNumberSlice || "";
    }
);
</script>

<style scoped></style>

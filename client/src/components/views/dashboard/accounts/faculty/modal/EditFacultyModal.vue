<template>
    <div>
        <v-dialog v-model="editFacultyStore.isEditFacultyModalOpen" transition="dialog-bottom-transition">
            <v-card v-if="editFacultyStore.isEditFacultyModalOpen" max-width="500px" max-height="600px"
                class="y-axis-scrollbar mx-auto">
                <v-container>
                    <div class="flex">
                        <p class="text-[1.3rem] font-[500]">Edit Account</p>
                        <v-spacer></v-spacer>
                        <v-btn variant="tonal"
                            @click="editFacultyStore.handleCloseEditFacultyModal(false)"><v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </v-container>
                <v-card-text>
                    <v-form @submit.prevent="editFacultyStore.handleEditFaculty">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editFacultyStore.firstName" label="Firstname"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editFacultyStore.lastName" label="Lastname"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.middleName"
                                        label="Middlename"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.suffix" label="Suffix"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.position" label="Position"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.designation"
                                        label="Designation"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.hgt" label="HGT"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.wgt" label="WGT"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.sss" label="SSS"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.tin" label="TIN"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.birthDate" label="Datebirth"
                                        type="date"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.contactNumber"
                                        :rules="accountStateManagerStore.contactNumberRules" label="Contact Number"
                                        prefix="+63"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="-mt-[1.2rem]">
                                    <v-text-field v-model="editFacultyStore.contactPerson"
                                        :rules="accountStateManagerStore.contactNumberRules" prefix="+63"
                                        label="Contact Person"></v-text-field>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="-mt-[1.8rem]">
                                    <v-text-field v-model="editFacultyStore.address" label="Address"></v-text-field>
                                </div>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-btn type="submit" block class="bg-orange-darken-3" :loading="editFacultyStore.isLoading"
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
import { useEditFacultyStore, useRetrieveFacultyStore, useAccountStateManagerStore } from "@/components/stores/index";

// invoke store
const editFacultyStore = useEditFacultyStore();
const retrieveFacultyStore = useRetrieveFacultyStore();
const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
    return (

        accountStateManagerStore.contactNumberRules.every(
            (rule) => rule(editFacultyStore.contactNumber) === true
        )
    );
});
// watch
watch(
    () => editFacultyStore.idToEdit,
    (id) => {
        console.log(id);
        const facultyToEdit = retrieveFacultyStore.faculties.find((faculty) => faculty._id === id) || {};
        const contactNumberSlice = facultyToEdit.contactNumber ? facultyToEdit.contactNumber.slice(3) : "";
        const contactPersonSlice = facultyToEdit.contactPerson ? facultyToEdit.contactPerson.slice(3) : "";
        editFacultyStore.firstName = facultyToEdit.firstName || "";
        editFacultyStore.lastName = facultyToEdit.lastName || "";
        editFacultyStore.middleName = facultyToEdit.middleName || "";
        editFacultyStore.position = facultyToEdit.position || "";
        editFacultyStore.designation = facultyToEdit.designation || "";
        editFacultyStore.hgt = facultyToEdit.hgt || "";
        editFacultyStore.wgt = facultyToEdit.wgt || "";
        editFacultyStore.sss = facultyToEdit.sss || "";
        editFacultyStore.tin = facultyToEdit.tin || "";
        editFacultyStore.contactPerson = contactPersonSlice || "";
        editFacultyStore.address = facultyToEdit.address || "";
        editFacultyStore.birthDate = facultyToEdit.birthDate || "";
        editFacultyStore.contactNumber = contactNumberSlice || "";
    }
);
</script>

<style scoped></style>

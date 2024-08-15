<template>
    <div>
        <v-dialog v-model="deleteStudentStore.isDeleteStudentModalOpen" transition="dialog-bottom-transition">
            <v-card v-if="deleteStudentStore.isDeleteStudentModalOpen" width="500px" max-height="600px"
                class="edit-student-modal-scrollbar mx-auto">
                <v-container>
                    <div class="flex">
                        <p class="text-[1.3rem] font-[500]">Delete Account</p>
                        <v-spacer></v-spacer>
                        <v-btn variant="tonal"
                            @click="deleteStudentStore.handleCloseDeleteStudentModal(false)"><v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </v-container>
                <p class="text-center text-[1.5rem]">Are you sure want to delete?</p>
                <v-card-text> Kindly put your valid password.</v-card-text>

                <v-card-text>
                    <v-form @submit.prevent="deleteStudentStore.handleDeleteStudent">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="deleteStudentStore.password" label="Password"
                                    :type="deleteStudentStore.showPassword ? 'text' : 'password'"
                                    :append-inner-icon="deleteStudentStore.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="deleteStudentStore.togglePasswordVisibility"
                                    :rules="deleteStudentStore.passwordCheckingRules"
                                    ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-btn type="submit" block class="bg-orange-darken-3" :disabled="!isValidForm"
                                :loading="deleteStudentStore.isLoading">Delete</v-btn>
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
import { useDeleteStudentStore } from "@/components/stores/index";

// invoke store
const deleteStudentStore = useDeleteStudentStore();
// const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
    return deleteStudentStore.passwordCheckingRules.every(
        (rule) => rule(deleteStudentStore.password) === true,
    );
});
</script>

<style scoped>
.edit-student-modal-scrollbar::-webkit-scrollbar {
    width: 10px;
}

.edit-student-modal-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #ca7835, #e29562);
    border-radius: 2px;
    height: 10px;
}
</style>

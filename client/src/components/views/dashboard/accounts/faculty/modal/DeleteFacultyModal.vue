<template>
    <div>
        <v-dialog v-model="deleteFacultyStore.isDeleteFacultyModalOpen" transition="dialog-bottom-transition">
            <v-card v-if="deleteFacultyStore.isDeleteFacultyModalOpen" max-width="500px" max-height="600px"
                class=".y-axis-scrollbar mx-auto">
                <v-container>
                    <div class="flex">
                        <p class="text-[1.3rem] font-[500]">Delete Account</p>
                        <v-spacer></v-spacer>
                        <v-btn variant="tonal"
                            @click="deleteFacultyStore.handleCloseDeleteFacultyModal(false)"><v-icon>mdi-close</v-icon></v-btn>
                    </div>
                    <p class="text-[1.5rem] pt-[1rem]">Are you sure want to delete?</p>
                    <v-card-text class="px-0"> Kindly put your valid password.</v-card-text>

                    
                        <v-form @submit.prevent="deleteFacultyStore.handleDeleteFaculty">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="deleteFacultyStore.password" label="Password"
                                        :type="deleteFacultyStore.showPassword ? 'text' : 'password'"
                                        :append-inner-icon="deleteFacultyStore.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        @click:append-inner="deleteFacultyStore.togglePasswordVisibility"
                                        :rules="deleteFacultyStore.passwordCheckingRules"></v-text-field>
                                </v-col>
                            </v-row>

                            
                                <v-btn type="submit" block class="bg-orange-darken-3" :disabled="!isValidForm"
                                    :loading="deleteFacultyStore.isLoading">Delete</v-btn>
                            
                        </v-form>
                    
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
// vue
import { computed } from "vue";
// store
import { useDeleteFacultyStore } from "@/components/stores/index";

// invoke store
const deleteFacultyStore = useDeleteFacultyStore();
// const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
    return deleteFacultyStore.passwordCheckingRules.every(
        (rule) => rule(deleteFacultyStore.password) === true,
    );
});
</script>

<style scoped></style>

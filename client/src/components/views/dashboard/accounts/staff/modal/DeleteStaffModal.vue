<template>
    <div>
        <v-dialog v-model="deleteStaffStore.isDeleteStaffModalOpen" transition="dialog-bottom-transition">
            <v-card v-if="deleteStaffStore.isDeleteStaffModalOpen" width="500px" max-height="600px"
                class=".y-axis-scrollbar mx-auto">
                <v-container>
                    <div class="flex">
                        <p class="text-[1.3rem] font-[500]">Delete Account</p>
                        <v-spacer></v-spacer>
                        <v-btn variant="tonal"
                            @click="deleteStaffStore.handleCloseDeleteStaffModal(false)"><v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </v-container>
                <p class="text-center text-[1.5rem]">Are you sure want to delete?</p>
                <v-card-text> Kindly put your valid password.</v-card-text>

                <v-card-text>
                    <v-form @submit.prevent="deleteStaffStore.handleDeleteStaff">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="deleteStaffStore.password" label="Password"
                                    :type="deleteStaffStore.showPassword ? 'text' : 'password'"
                                    :append-inner-icon="deleteStaffStore.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="deleteStaffStore.togglePasswordVisibility"
                                    :rules="deleteStaffStore.passwordCheckingRules"
                                    ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-btn type="submit" block class="bg-orange-darken-3" :disabled="!isValidForm"
                                :loading="deleteStaffStore.isLoading">Delete</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
// vue
import { computed} from "vue";
// store
import { useDeleteStaffStore } from "@/components/stores/index";

// invoke store
const deleteStaffStore = useDeleteStaffStore();
// const accountStateManagerStore = useAccountStateManagerStore();

// computed
const isValidForm = computed(() => {
    return deleteStaffStore.passwordCheckingRules.every(
        (rule) => rule(deleteStaffStore.password) === true,
    );
});
</script>

<style scoped>

</style>

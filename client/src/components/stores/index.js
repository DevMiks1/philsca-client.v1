import { createPinia } from "pinia";

const pinia = createPinia();

export default pinia;
// login
export {useLoginStateManagerStore} from "@/components/stores/modules/login/stateManager"
export {useLoginStore} from "@/components/stores/modules/login/login"
// dashboard
export {useDashboardStateManagerStore} from "@/components/stores/modules/dashboard/stateManager"
// accounts
export {useAccountStateManagerStore} from "@/components/stores/modules/dashboard/accounts/stateManager"
export {useAccountStore} from "@/components/stores/modules/dashboard/accounts/accounts"
// students
export {useRetrieveStudentStore} from "@/components/stores/modules/dashboard/accounts/student/retrieveStudents"
export {useEditStudentStore} from "@/components/stores/modules/dashboard/accounts/student/EditStudent"
export {useDeleteStudentStore} from "@/components/stores/modules/dashboard/accounts/student/deleteStudent"
export {useViewStudentStore} from "@/components/stores/modules/dashboard/accounts/student/viewStudent"
// staff
export {useRetrieveStaffStore} from "@/components/stores/modules/dashboard/accounts/staff/retrieveStaff"
export {useEditStaffStore} from "@/components/stores/modules/dashboard/accounts/staff/editStaff"
export {useDeleteStaffStore} from "@/components/stores/modules/dashboard/accounts/staff/deleteStaff"
export {useViewStaffStore} from "@/components/stores/modules/dashboard/accounts/staff/viewStaff"
// faculty
export {useRetrieveFacultyStore} from "@/components/stores/modules/dashboard/accounts/faculty/retrieveFaculty"
export {useEditFacultyStore} from "@/components/stores/modules/dashboard/accounts/faculty/editFaculty"
export {useDeleteFacultyStore} from "@/components/stores/modules/dashboard/accounts/faculty/deleteFaculty"
export {useViewFacultyStore} from "@/components/stores/modules/dashboard/accounts/faculty/viewFaculty"

// auth
export {useAuthStore} from "@/components/stores/modules/auth/auth"
export {useLogoutStore} from "@/components/stores/modules/logout/logout"

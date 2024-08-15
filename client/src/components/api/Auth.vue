<script>

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const globalUrl = `${baseUrl}/philsca/auth`

export const auth = async () => {
    try {
        const response = await axios.get(globalUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Include cookies and credentials
        });
        return response.data;
    } catch (error) {
        console.error("No Authorization:", error);
        throw new error;
    }
};




</script>
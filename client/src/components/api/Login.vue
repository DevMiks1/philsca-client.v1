<script>

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const globalUrl = `${baseUrl}/philsca/login`



export const login = async ({ body }) => {

    try {
        const response = await axios.post(globalUrl, body, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Include cookies and credentials
        });
        
        return response.data;
    } catch (error) {
        console.error("Error fetching accounts:", error);
        throw error;
    }
};




</script>
<script>

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const globalUrl = `${baseUrl}/philsca/logout`

export const logout = async () => {

    try {
        const response = await axios.post(globalUrl, {}, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },

        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching accounts:", error);
        throw error;
    }
};




</script>
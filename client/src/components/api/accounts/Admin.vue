<script>

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const globalUrl = `${baseUrl}/philsca/admin-details`

const headers = {
  "Content-Type": "application/json",
};


export const updateAdmin = async ({ body, id }) => {
  
  try {
    const response = await axios.patch(
      `${globalUrl}/${id}`,
      JSON.stringify(body),
      { headers, withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};


</script>
<script>

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const globalUrl = `${baseUrl}/philsca/staff-details`

const headers = {
  "Content-Type": "application/json",
};

export const retrieveAllStaff = async () => {
  try {
    const response = await axios.get(globalUrl, {
      headers,
      withCredentials: true, 

    });
    return response.data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }
};

export const deleteStaff = async ({ id }) => {
  try {
    const response = await axios.delete(`${globalUrl}/${id}`, {
      headers,
      withCredentials: true
    });
    return response.data; 
  } catch (error) {
    console.error("Error deleting staff:", error);
    throw error;
  }
};

export const updateStaff = async ({ body, id }) => {
  
  try {
    const response = await axios.patch(
      `${globalUrl}/${id}`,
      JSON.stringify(body),
      { headers, withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error("Error updating staff:", error);
    throw error;
  }
};


</script>
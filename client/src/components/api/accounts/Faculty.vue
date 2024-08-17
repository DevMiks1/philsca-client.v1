<script>

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const globalUrl = `${baseUrl}/philsca/faculty-details`

const headers = {
  "Content-Type": "application/json",
};

export const retrieveAllFaculty = async () => {
  try {
    const response = await axios.get(globalUrl, {
      headers,
      withCredentials: true, 

    });
    return response.data;
  } catch (error) {
    console.error("Error fetching faculty:", error);
    throw error;
  }
};

export const deleteFaculty = async ({ id }) => {
  try {
    const response = await axios.delete(`${globalUrl}/${id}`, {
      headers,
      withCredentials: true
    });
    return response.data; 
  } catch (error) {
    console.error("Error deleting faculty:", error);
    throw error;
  }
};

export const updateFaculty = async ({ body, id }) => {
  
  try {
    const response = await axios.patch(
      `${globalUrl}/${id}`,
      JSON.stringify(body),
      { headers, withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    console.error("Error updating faculty:", error);
    throw error;
  }
};


</script>
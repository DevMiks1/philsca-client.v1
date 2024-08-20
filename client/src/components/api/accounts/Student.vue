<script>

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const globalUrl = `${baseUrl}/philsca/student-details`

const headers = {
  "Content-Type": "application/json",
};

export const retrieveAllStudent = async () => {
  try {
    const response = await axios.get(globalUrl, {
      headers,
      withCredentials: true, 

    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

export const deleteStudent = async ({ id }) => {
  try {
    const response = await axios.delete(`${globalUrl}/${id}`, {
      headers,
      withCredentials: true
    });
    return response.data; 
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};

export const updateStudent = async ({ body, id }) => {
  console.log(id);
  try {
    const response = await axios.patch(
      `${globalUrl}/${id}`,
      JSON.stringify(body),
      { headers, withCredentials: true }
    );
    
    return response.data; 
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};



</script>
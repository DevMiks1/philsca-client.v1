<script>

// import axios from "axios";

// const baseUrl = import.meta.env.VITE_BASE_URL;
// const globalUrl = `${baseUrl}/philsca/account`

// const headers = {
//   "Content-Type": "application/json",
// };

// export const retrieveAllAccount = async () => {
//   try {
//     const response = await axios.get(globalUrl, {
//       headers,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching accounts:", error);
//     throw error;
//   }
// };

// export const retrieveUserDB = async ({ _id }) => {
//   try {
//     const response = await axios.get(
//       `${globalUrl}/accounts/retrieve/${_id}`,
//       {
//         headers,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching accounts:", error);
//     throw error;
//   }
// };

export const deleteAccount = async ({ id }) => {
  try {
    const response = await axios.delete(`${globalUrl}/${id}`, {
      headers,
    });
    return response.data; 
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const updateAccount = async ({ body, id }) => {
  
  try {
    const response = await axios.patch(
      `${globalUrl}/${id}`,
      JSON.stringify(body),
      { headers }
    );
    console.log("Update response:", response.data.newData); 
    return response.data; 
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};

export const createAccount = async ({ body }) => {
  try {
    const response = await axios.post(
      globalUrl,
      JSON.stringify(body),
      { headers }
    );
    return response.data; 
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

</script>
<script>
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const globalUrl = `${baseUrl}/philsca/user-account`;

const headers = {
  "Content-Type": "application/json",
};

export const createAccount = async ({ body }) => {
  try {
    const response = await axios.post(globalUrl, JSON.stringify(body), {
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};
</script>

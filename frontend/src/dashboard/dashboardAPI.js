import axios from "axios";

export const fetchDashboardAPI = async (days) => {
  const response = await axios.get(
    `http://localhost:5001/api/dashboard?days=${days}`
  );
  return response.data;
};
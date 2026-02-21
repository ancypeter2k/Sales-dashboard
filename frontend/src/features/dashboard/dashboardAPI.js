import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "" : "http://localhost:5001");

export const fetchDashboardAPI = async (days) => {
  const response = await axios.get(`${API_BASE}/api/dashboard?days=${days}`);
  return response.data;
};

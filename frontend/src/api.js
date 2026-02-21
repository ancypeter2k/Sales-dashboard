import axios from "axios";

const API = "http://localhost:5001/api";

export const fetchDashboard = async (days) => {
  const res = await axios.get(`${API}/dashboard?days=${days}`);
  return res.data;
};
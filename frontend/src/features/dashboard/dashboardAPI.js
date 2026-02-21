import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export const BACKEND_DISPLAY_URL = API_BASE;

const STATUSES = [
  "New",
  "Contacted",
  "Follow Up",
  "Appointment Booked",
  "Converted",
  "Lost",
];

/** Sample data when backend is unreachable so the dashboard still renders */
function getMockDashboardData(days = 7) {
  const d = new Date();
  const salesTrend = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(d);
    date.setDate(d.getDate() - i);
    salesTrend.push({
      date: date.toISOString().split("T")[0],
      revenue: Math.floor(Math.random() * 3000) + 500,
    });
  }
  return {
    kpis: {
      totalLeads: 42,
      contactedLeads: 18,
      salesClosed: 5,
      totalRevenue: 12400,
    },
    statusSummary: STATUSES.map((status) => ({
      status,
      count: Math.floor(Math.random() * 12) + 2,
    })),
    salesTrend,
  };
}

export const fetchDashboardAPI = async (days) => {
  try {
    const response = await axios.get(`${API_BASE}/api/dashboard?days=${days}`);
    return { data: response.data, fallback: false };
  } catch {
    return { data: getMockDashboardData(days), fallback: true };
  }
};

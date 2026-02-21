import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardAPI } from "./dashboardAPI";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (days) => {
    return await fetchDashboardAPI(days);
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: null,
    loading: false,
    error: null,
    days: 7,
    fallbackData: false,
  },
  reducers: {
    setDays: (state, action) => {
      state.days = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const payload = action.payload;
        state.data = payload?.data ?? payload;
        state.fallbackData = payload?.fallback ?? false;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch data";
      });
  },
});

export const { setDays } = dashboardSlice.actions;
export default dashboardSlice.reducer;

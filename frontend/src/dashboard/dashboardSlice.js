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
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch data";
      });
  },
});

export const { setDays } = dashboardSlice.actions;
export default dashboardSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Appointments } from "../components/Favor/IAppoints.ts";

export const fetchAppGet = createAsyncThunk(
  "fetch/appointment",
  async (status: string) => {
    const appointment = await axios.get(
      `http://localhost:5000/api/appointment?status=${status}`,
    );
    return appointment.data;
  },
);
export const postAppoint = createAsyncThunk("post/appoint", async (appoint) => {
  const newApp = await axios.post(
    "http://localhost:5000/api/appointment",
    appoint,
  );
  return newApp.data;
});

const AppointSlice = createSlice({
  name: "apponts",
  initialState: {
    appoints: [] as Appointments[],
    appoint: {} as Appointments,
    isLoad: false,
    error: null as string | null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAppGet.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(fetchAppGet.fulfilled, (state, action) => {
      state.appoints = action.payload.rows;
      state.isLoad = false;
    });
    builder.addCase(fetchAppGet.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
    builder.addCase(postAppoint.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(postAppoint.fulfilled, (state, action) => {
      state.isLoad = false;
      state.appoint = action.payload;
    });
    builder.addCase(postAppoint.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
  },
});
export default AppointSlice.reducer;

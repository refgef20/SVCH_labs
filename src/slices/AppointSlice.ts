import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Appointments } from "../components/Favor/IAppoints.ts";
import { Product } from "../components/Catalog/IProduct.tsx";
import { Master } from "../components/Masters/IMaster.tsx";
import { Favor } from "../components/Favor/IFavor.tsx";
import { Delget } from "./CartsSlice.ts";

export interface AppointmentsMastFav {
  id: number;
  date: string;
  status: string | "создана";
  Master: Master;
  Favor: Favor;
  userId: number;
}

export const fetchAppGet = createAsyncThunk(
  "fetch/appointment",
  async (status: string) => {
    const appointment = await axios.get(
      `http://localhost:5000/api/appointment?status=${status}`,
    );
    return appointment.data;
  },
);
export const postAppoint = createAsyncThunk(
  "post/appoint",
  async (appoint: Appointments) => {
    const newApp = await axios.post(
      "http://localhost:5000/api/appointment",
      appoint,
    );
    return newApp.data;
  },
);
export const getApp = createAsyncThunk("getUs/App", async (UserId: number) => {
  const app = await axios.get(
    `http://localhost:5000/api/user/${UserId}/appointment`,
  );
  return app.data;
});
export const getAppsMastfav = createAsyncThunk(
  "gey/masFv",
  async (userId: number) => {
    const apps = await axios.get(
      `http://localhost:5000/api/user/${userId}/appointsFavMast`,
    );
    return apps.data;
  },
);
export const delApp = createAsyncThunk(
  "del/app",
  async ({ id, userId }: Delget) => {
    const app = await axios.delete(
      `http://localhost:5000/api/appointment/${id}`,
    );
    const apps = await axios.get(
      `http://localhost:5000/api/user/${userId}/appointsFavMast`,
    );
    return apps.data;
  },
);

const AppointSlice = createSlice({
  name: "apponts",
  initialState: {
    appoints: [] as Appointments[],
    appsMastFav: [] as AppointmentsMastFav[],
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

    builder.addCase(delApp.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(delApp.fulfilled, (state, action) => {
      state.appsMastFav = action.payload;
      state.isLoad = false;
    });

    builder.addCase(delApp.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });

    builder.addCase(getAppsMastfav.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(getAppsMastfav.fulfilled, (state, action) => {
      state.isLoad = false;
      state.appsMastFav = action.payload;
    });
    builder.addCase(getAppsMastfav.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
  },
});
export default AppointSlice.reducer;

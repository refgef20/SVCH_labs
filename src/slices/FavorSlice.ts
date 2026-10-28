import { createSlice } from "@reduxjs/toolkit";
import { Favor } from "../components/Favor/IFavor.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchСatFav = createAsyncThunk(
  "favors/getFavorsCat",
  async (category: string) => {
    const favors = await axios.get(
      `http://localhost:5000/api/services?category=${category}`,
    );
    return favors.data;
  },
);

const CatalFav = createSlice({
  name: "Favors",
  initialState: {
    favors: [] as Favor[],
    item: {} as Favor,
    isLoad: false,
    error: null as string | null,
    activeCat: "",
  },
  reducers: {
    setActive(state, action) {
      state.activeCat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchСatFav.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(fetchСatFav.fulfilled, (state, action) => {
      state.isLoad = false;
      state.favors = action.payload.rows;
    });
    builder.addCase(fetchСatFav.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
  },
});
export const { setActive } = CatalFav.actions;
export default CatalFav.reducer;

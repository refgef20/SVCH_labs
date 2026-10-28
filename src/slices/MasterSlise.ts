import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Master } from "../components/Masters/IMaster.tsx";

export const fetchGet = createAsyncThunk(
  "fetch/masterGet",
  async (search: string) => {
    console.log(search);
    const masters = await axios.get(
      `http://localhost:5000/api/master?search=${search}`,
    );
    console.log(masters.data);
    return masters.data;
  },
);

const MastersS = createSlice({
  name: "masters",
  initialState: {
    masters: [] as Master[],
    isLoad: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGet.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(fetchGet.fulfilled, (state, action) => {
      state.isLoad = false;
      state.masters = action.payload.rows;
    });
    builder.addCase(fetchGet.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
  },
});

export default MastersS.reducer;

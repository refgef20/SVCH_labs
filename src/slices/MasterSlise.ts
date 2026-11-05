import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Master } from "../components/Masters/IMaster.tsx";

interface fetchMasters {
  page: number;
  limit: number;
}

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
export const fetchMasters = createAsyncThunk(
  "fetch/masters",
  async ({ page, limit }: fetchMasters) => {
    const masters = await axios(
      `http://localhost:5000/api/master?page=${page}&limit=${limit}`,
    );
    return masters.data;
  },
);

export const fetchMastersBase = createAsyncThunk(
  "fetch/mastersBase",
  async () => {
    const masters = await axios(`http://localhost:5000/api/master`);
    return masters.data;
  },
);

const MastersS = createSlice({
  name: "masters",
  initialState: {
    masters: [] as Master[],
    mastersCat: [] as Master[],
    mastersBase: [] as Master[],
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
      state.mastersCat = action.payload.rows;
    });
    builder.addCase(fetchGet.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
    builder.addCase(fetchMasters.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(fetchMasters.fulfilled, (state, action) => {
      state.isLoad = false;
      state.masters = action.payload.rows;
    });
    builder.addCase(fetchMasters.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });

    builder.addCase(fetchMastersBase.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(fetchMastersBase.fulfilled, (state, action) => {
      state.isLoad = false;
      state.mastersBase = action.payload.rows;
    });
    builder.addCase(fetchMastersBase.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
  },
});

export default MastersS.reducer;

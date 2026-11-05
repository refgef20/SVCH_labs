import axios from "axios";
import { Product } from "../components/Catalog/IProduct";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Favourite } from "../components/Cart&Favourite/IFavourite";
import { Delget } from "./CartsSlice";

export const deleteFavourite = createAsyncThunk(
  "delete/fav",
  async ({ id, userId }: Delget) => {
    const fav = await axios.delete(`http://localhost:5000/api/favourite/${id}`);
    const getFav = await axios.get(
      `http://localhost:5000/api/user/${userId}/favourite`,
    );
    return getFav.data;
  },
);

export const fetchGet = createAsyncThunk(
  "fetch/getUsersPr",
  async (userId: number) => {
    const getFav = await axios.get(
      `http://localhost:5000/api/user/${userId}/favourite`,
    );
    return getFav.data;
  },
);

export const addFavourite = createAsyncThunk(
  "post/fav",
  async (favourite: Favourite) => {
    const fave = await axios.post(
      "http://localhost:5000/api/favourite",
      favourite,
    );
    return fave.data;
  },
);

const FavouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    items: [] as Product[],
    itemFav: {} as Favourite,
    isLoad: false,
    error: null as string | null,
  },
  reducers: {
    addFav(state, action) {
      state.items.push(action.payload);
    },
    deleteProductFav(state, action) {
      state.items = state.items.filter(
        (product) => product.id != action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteFavourite.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(deleteFavourite.fulfilled, (state, action) => {
      state.items = action.payload.usersFavour;
      state.isLoad = false;
    });
    builder.addCase(deleteFavourite.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла ошибка";
    });

    builder.addCase(fetchGet.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(fetchGet.fulfilled, (state, action) => {
      state.items = action.payload.usersFavour;
      state.isLoad = false;
    });
    builder.addCase(fetchGet.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла ошибка";
    });

    builder.addCase(addFavourite.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(addFavourite.fulfilled, (state, action) => {
      state.itemFav = action.payload;
      state.isLoad = false;
    });
    builder.addCase(addFavourite.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла ошибка";
    });
  },
});
export const { addFav, deleteProductFav } = FavouriteSlice.actions;
export default FavouriteSlice.reducer;

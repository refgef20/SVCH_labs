import { Product } from "../components/Catalog/IProduct";
import { createSlice } from "@reduxjs/toolkit";

const FavouriteSlice = createSlice({
  name: "favourite",
  initialState: { items: [] as Product[] },
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
});
export const { addFav, deleteProductFav } = FavouriteSlice.actions;
export default FavouriteSlice.reducer;

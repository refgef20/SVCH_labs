import { Product } from "../components/Catalog/IProduct";
import { createSlice } from "@reduxjs/toolkit";

const CartsSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as Product[],
  },
  reducers: {
    addProdCart(state, action) {
      state.items.push(action.payload);
    },
    setCartProd(state, action) {
      state.items = action.payload;
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(
        (product) => product.id != action.payload,
      );
    },
  },
});
export const { addProdCart, setCartProd, deleteProduct } = CartsSlice.actions;
export default CartsSlice.reducer;

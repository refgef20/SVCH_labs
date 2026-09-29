import { useEffect } from "react";
import { Product } from "../components/Catalog/IProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [] as Product[],
    allProducts: [] as Product[],
    item: {} as Product,
    isLoad: false,
    error: null,
    setid: null,
  },
  reducers: {
    deleteProduct(state, action) {
      state.items = state.items.filter(
        (product) => product.id != action.payload,
      );
    },
    redactProduct(state, action) {
      state.setid = action.payload;
    },
    saveRedactProd(state, action) {
      const product = state.items.find((p) => p.id == action.payload.idSel);
      console.log(action.payload.name);
      if (product) {
        product.name_en = action.payload.name;
        product.description_en = action.payload.description;
        product.price = action.payload.price;
      }
    },
    findProduct(state, action) {
      if (action.payload == "") {
        state.items = state.allProducts;
        return;
      }
      console.log(action.payload);
      state.items = state.allProducts.filter((product) =>
        product.name_en.toLowerCase().startsWith(action.payload.toLowerCase()),
      );
    },
    sortRatingProduct(state) {
      state.items.sort((a, b) => a.rating - b.rating);
    },
    sortPriceProduct(state) {
      state.items.sort((a, b) => a.price - b.price);
    },
    setLoad(state, action) {
      state.isLoad = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setProducts(state, action) {
      state.items = action.payload;
      state.allProducts = action.payload;
    },
  },
});
export const {
  deleteProduct,
  saveRedactProd,
  redactProduct,
  sortPriceProduct,
  sortRatingProduct,
  findProduct,
  setLoad,
  setError,
  setProducts,
} = ProductSlice.actions;
export default ProductSlice.reducer;

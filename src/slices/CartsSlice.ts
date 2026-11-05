import { Product } from "../components/Catalog/IProduct";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Carts } from "../components/Cart&Favourite/ICart";

export interface Delget {
  id: number;
  userId: number;
}

export const fetchGet = createAsyncThunk(
  "fetch/getUsersPr",
  async (userId: number) => {
    const getCart = await axios.get(
      `http://localhost:5000/api/user/${userId}/cart`,
    );
    return getCart.data;
  },
);

export const deleteCart = createAsyncThunk(
  "fetch/deleteCart",
  async ({ id, userId }: Delget) => {
    const cart = await axios.delete(`http://localhost:5000/api/cart/${id}`);
    const getCart = await axios.get(
      `http://localhost:5000/api/user/${userId}/cart`,
    );
    return getCart.data;
  },
);

export const addCart = createAsyncThunk("post/cart", async (product: Carts) => {
  const cart = await axios.post("http://localhost:5000/api/cart", product);
  return cart.data;
});

const CartsSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as Product[],
    itemsCart: {} as Carts,
    isLoad: false,
    error: null as string | null,
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
  extraReducers: (builder) => {
    builder.addCase(fetchGet.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(fetchGet.fulfilled, (state, action) => {
      state.items = action.payload.usersProducts;
      state.isLoad = false;
    });
    builder.addCase(fetchGet.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла ошибка";
    });

    builder.addCase(deleteCart.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.items = action.payload.usersProducts;
      state.isLoad = false;
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла ошибка";
    });

    builder.addCase(addCart.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(addCart.fulfilled, (state, action) => {
      state.itemsCart = action.payload;
      state.isLoad = false;
    });
    builder.addCase(addCart.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла ошибка";
    });
  },
});
export const { addProdCart, setCartProd, deleteProduct } = CartsSlice.actions;
export default CartsSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../components/Cart&Favourite/CardProduct";
import axios from "axios";
import { Delget } from "./CartsSlice";
import { UsProd } from "../components/Cart&Favourite/CardProduct";

export interface Orders {
  id: number;
  amount: number;
  UserId: number;
  ProductId: number;
  address: string;
}

export const postOrder = createAsyncThunk(
  "post/order",
  async (order: Order) => {
    const ord = await axios.post("http://localhost:5000/api/order", order);
    return ord.data;
  },
);

export const getOrd = createAsyncThunk(
  "getUsers/orders",
  async (userId: number) => {
    const ord = await axios.get(
      `http://localhost:5000/api/user/${userId}/order`,
    );
    return ord.data;
  },
);
export const deleteOrd = createAsyncThunk(
  "delete/order",
  async ({ id, userId }: Delget) => {
    const ord = await axios.delete(`http://localhost:5000/api/order/${id}`);
    const order = await axios.get(
      `http://localhost:5000/api/user/${userId}/order`,
    );
    return order.data;
  },
);

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [] as Orders[],
    ordersProd: [] as UsProd[],
    isLoad: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrd.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(getOrd.fulfilled, (state, action) => {
      state.isLoad = false;
      state.ordersProd = action.payload.userOrder;
    });
    builder.addCase(getOrd.rejected, (state, action) => {
      state.isLoad = true;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });

    builder.addCase(postOrder.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoad = false;
      state.orders = action.payload;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoad = true;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });

    builder.addCase(deleteOrd.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(deleteOrd.fulfilled, (state, action) => {
      state.isLoad = false;
      state.ordersProd = action.payload.userOrder;
    });
    builder.addCase(deleteOrd.rejected, (state, action) => {
      state.isLoad = true;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
  },
});
export default OrderSlice.reducer;

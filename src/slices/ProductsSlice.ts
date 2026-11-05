import { useEffect } from "react";
import { Product } from "../components/Catalog/IProduct";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Sort {
  sortOrder: string;
  sortBy: string;
}

interface Patch {
  idSel: number;
  name: string;
  description: string;
  price: number;
}

export const find = createAsyncThunk("search/prod", async (search: string) => {
  const products = await axios.get(
    `http://localhost:5000/api/product?search=${search}`,
  );
  return products.data;
});

export const products = createAsyncThunk("all/products", async () => {
  const products = await axios.get("http://localhost:5000/api/product");
  console.log(products);
  return products.data;
});

export const sort = createAsyncThunk(
  "sort/products",
  async ({ sortOrder, sortBy }: Sort) => {
    const products = await axios.get(
      `http://localhost:5000/api/product?sortby=${sortBy}&sortOrder=${sortOrder}`,
    );
    console.log(products);
    return products.data;
  },
);

export const deleteP = createAsyncThunk(
  "delete/products",
  async (id: number) => {
    await axios.delete(`http://localhost:5000/api/product/${id}`);
    const products = await axios.get("http://localhost:5000/api/product");
    return products.data;
  },
);

export const redactP = createAsyncThunk(
  "patch/products",
  async ({ idSel, name, description, price }: Patch) => {
    const product = await axios.patch(
      `http://localhost:5000/api/product/${idSel}`,
      { name, description, price },
    );
    const products = await axios.get("http://localhost:5000/api/product");
    return products.data;
  },
);

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    items: [] as Product[],
    allProducts: [] as Product[],
    item: {} as Product,
    isLoad: false,
    error: null as string | null,
    setid: null,
  },
  reducers: {
    redactProduct(state, action) {
      state.setid = action.payload;
    },
    saveRedactProd(state, action) {
      const product = state.items.find((p) => p.id == action.payload.idSel);
      console.log(action.payload.name);
      if (product) {
        product.name = action.payload.name;
        product.description = action.payload.description;
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
        product.name.toLowerCase().startsWith(action.payload.toLowerCase()),
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
  extraReducers: (builder) => {
    builder.addCase(find.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(find.fulfilled, (state, action) => {
      state.isLoad = false;
      state.items = action.payload.rows;
    });
    builder.addCase(find.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });

    builder.addCase(products.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(products.fulfilled, (state, action) => {
      state.isLoad = false;
      console.log(action.payload);
      state.items = action.payload.rows;
    });
    builder.addCase(products.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });

    builder.addCase(sort.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(sort.fulfilled, (state, action) => {
      state.isLoad = false;
      state.items = action.payload.rows;
    });
    builder.addCase(sort.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });

    builder.addCase(deleteP.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(deleteP.fulfilled, (state, action) => {
      state.isLoad = false;
      state.items = action.payload.rows;
    });
    builder.addCase(deleteP.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });

    builder.addCase(redactP.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(redactP.fulfilled, (state, action) => {
      state.isLoad = false;
      state.items = action.payload.rows;
    });
    builder.addCase(redactP.rejected, (state, action) => {
      state.isLoad = false;
      state.error = action.error.message || "Произошла непредвиденная ошибка";
    });
  },
});
export const {
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

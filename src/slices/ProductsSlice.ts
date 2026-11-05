import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    search: "",
    sortBy: "sort",
  },
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});
export const { setSearch, setSort } = ProductSlice.actions;
export default ProductSlice.reducer;

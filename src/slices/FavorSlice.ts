import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const CatalFav = createSlice({
  name: "Favors",
  initialState: {
    activeCat: "",
  },
  reducers: {
    setActive(state, action: PayloadAction<string>) {
      state.activeCat = action.payload;
    },
  },
});
export const { setActive } = CatalFav.actions;
export default CatalFav.reducer;

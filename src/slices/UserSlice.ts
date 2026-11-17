import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
  name: "user",
  initialState: {
    accessToken: "",
  },
  reducers: {
    changeToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});
export const { changeToken } = User.actions;
export default User.reducer;

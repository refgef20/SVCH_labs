import { createSlice } from "@reduxjs/toolkit";

interface UserRoles {
  clientName: string;
  clientPhone: string;
  password: string;
  role: string;
}

const User = createSlice({
  name: "user",
  initialState: {
    accessToken: "",
    user: {} as UserRoles,
  },
  reducers: {
    changeToken(state, action) {
      state.accessToken = action.payload;
    },
    changeUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const { changeToken, changeUser } = User.actions;
export default User.reducer;

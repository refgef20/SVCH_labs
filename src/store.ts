import { configureStore } from "@reduxjs/toolkit";
import CatalFav from "./slices/FavorSlice";
import User from "./slices/UserSlice";

const Store = configureStore({
  reducer: {
    catalServ: CatalFav,
    user: User,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;

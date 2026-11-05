import { configureStore } from "@reduxjs/toolkit";
import CatalFav from "./slices/FavorSlice";

const Store = configureStore({
  reducer: {
    catalServ: CatalFav,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;

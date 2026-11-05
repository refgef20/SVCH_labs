import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductsSlice";
import CatalFav from "./slices/FavorSlice";

const Store = configureStore({
  reducer: {
    catalServ: CatalFav,
    catalProd: ProductSlice,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;

import { configureStore } from "@reduxjs/toolkit";
import {
  deleteProduct,
  redactProduct,
  sortPriceProduct,
  sortRatingProduct,
  findProduct,
} from "./slices/ProductsSlice";
import ProductSlice from "./slices/ProductsSlice";
import CartsSlice from "./slices/CartsSlice";
import FavouriteSlice from "./slices/FavouriteSlice";
import { addProdCart } from "./slices/CartsSlice";
import CatalFav from "./slices/FavorSlice";
import MastersS from "./slices/MasterSlise";

const Store = configureStore({
  reducer: {
    catMast: MastersS,
    catalServ: CatalFav,
    catalProd: ProductSlice,
    cartProd: CartsSlice,
    favProd: FavouriteSlice,
  },
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;

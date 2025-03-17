import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@redux/slices/authSlice";
import accountSlice from "@redux/slices/accountSlice";
import addressSlice from "@redux/slices/addressSlice";
import cartSlice from "@redux/slices/cartSlice";
import productSlice from "@redux/slices/productSlide";
import shopInfoSlice from "@redux/slices/shopInfoSLice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    account: accountSlice,
    address: addressSlice,
    cart: cartSlice,
    products: productSlice,
    shopInfo: shopInfoSlice,
  },
});

export default store;

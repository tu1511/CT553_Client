import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@redux/slices/authSlice";
import accountSlice from "@redux/slices/accountSlice";
import addressSlice from "@redux/slices/addressSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    account: accountSlice,
    address: addressSlice,
  },
});

export default store;

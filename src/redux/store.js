import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@redux/slices/authSlice";
import accountSlice from "@redux/slices/accountSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    account: accountSlice,
  },
});

export default store;

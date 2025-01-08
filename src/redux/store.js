import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@redux/slices/authSlice";
import userSlice from "@redux/slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  //   loginWithSocialThunk,
  //   logoutThunk,
  getLoggedInUser,
} from "@redux/thunk/authThunk";

const initialState = {
  authUser: null,
  error: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.metadata.account;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLoggedInUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.metadata;
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

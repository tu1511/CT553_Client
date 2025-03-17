import { getInfo } from "@redux/thunk/shopInfoThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shopInfo: null,
  loading: false,
  error: null,
};

const shopInfoSlice = createSlice({
  name: "shopInfo",
  initialState,
  reducers: {
    setShopInfo: (state, action) => {
      state.shopInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.shopInfo = action.payload?.metadata || null;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi không xác định!";
      });
  },
});

export const { setShopInfo } = shopInfoSlice.actions;
export default shopInfoSlice.reducer;

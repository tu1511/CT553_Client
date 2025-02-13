import {
  createAddressThunk,
  deleteAddressThunk,
  getUserAddressThunk,
  updateAddressThunk,
} from "@redux/thunk/addressThunk";
import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Bạn có thể thêm các reducers tùy chỉnh tại đây nếu cần
  },
  extraReducers: (builder) => {
    // Handle createAddressThunk
    builder
      .addCase(createAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddressThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload); // Thêm địa chỉ mới vào danh sách
      })
      .addCase(createAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Xử lý lỗi khi tạo địa chỉ
      })

      // Handle updateAddressThunk
      .addCase(updateAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddressThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Cập nhật địa chỉ trong danh sách
        state.addresses = state.addresses.map((address) =>
          address._id === action.payload._id ? action.payload : address
        );
      })
      .addCase(updateAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Xử lý lỗi khi cập nhật địa chỉ
      })

      .addCase(getUserAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAddressThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload?.metadata;
      })
      .addCase(getUserAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAddressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddressThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload.metadata._id
        );
      })
      .addCase(deleteAddressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;

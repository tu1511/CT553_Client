import { createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "@services/address.service";

// Thunk để tạo địa chỉ mới
export const createAddressThunk = createAsyncThunk(
  "address/createAddress",
  async ({ addressData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await addressService.createAddress(
        addressData,
        accessToken
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// // Thunk để cập nhật địa chỉ
// export const updateAddressThunk = createAsyncThunk(
//   "address/updateAddress",
//   async ({ updatedData, id, accessToken }, { rejectWithValue }) => {
//     try {
//       const response = await addressService.updateAddress(
//         updatedData,
//         id,
//         accessToken
//       );
//       return response; // Trả về dữ liệu phản hồi nếu thành công
//     } catch (error) {
//       return rejectWithValue(error.message); // Trả về thông điệp lỗi nếu thất bại
//     }
//   }
// );

// export const deleteAddressThunk = createAsyncThunk(
//   "address/deleteAddress",
//   async ({ id, accessToken }, { rejectWithValue }) => {
//     try {
//       const response = await addressService.deleteAddress(id, accessToken);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const getUserAddressThunk = createAsyncThunk(
//   "address/getUserAddress",
//   async (accessToken, { rejectWithValue }) => {
//     try {
//       const response = await addressService.getUserAddress(accessToken);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const setDefaultAddressThunk = createAsyncThunk(
//   "address/setDefaultAddress",
//   async ({ id, accessToken }, { rejectWithValue }) => {
//     try {
//       const response = await addressService.setDefaultAddress(id, accessToken);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

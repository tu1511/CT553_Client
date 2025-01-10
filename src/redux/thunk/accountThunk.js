import { createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "@services/account.service";

export const getLoggedInUser = createAsyncThunk(
  "account/getLoggedInUser",
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await accountService.getLoggedInUser(accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const updateUserInfoThunk = createAsyncThunk(
  "account/updateUserInfo",
  async ({ updatedData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await accountService.updateInformation(
        updatedData,
        accessToken
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Cập nhật thất bại");
    }
  }
);

export const changePasswordThunk = createAsyncThunk(
  "account/changePassword",
  async ({ passwordData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await accountService.changePassword(
        passwordData,
        accessToken
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Cập nhật thất bại");
    }
  }
);

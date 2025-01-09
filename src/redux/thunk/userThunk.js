import { createAsyncThunk } from "@reduxjs/toolkit";

import userService from "@services/user.service";

export const getLoggedInUser = createAsyncThunk(
  "users/getLoggedInUser",
  async (accessToken, thunkAPI) => {
    try {
      const response = await userService.getLoggedInUser();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@services/auth.service";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = (await authService.login(credentials)).data;
      // Lưu access token và refresh token vào localStorage
      localStorage.setItem(
        "accessToken",
        response.metadata?.tokens?.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.metadata?.tokens?.refreshToken
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

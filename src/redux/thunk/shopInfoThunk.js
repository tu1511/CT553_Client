import { createAsyncThunk } from "@reduxjs/toolkit";
import shopInfoService from "@services/shopInfo.service";

export const getInfo = createAsyncThunk(
  "shopInfo/getInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await shopInfoService.getInfo();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

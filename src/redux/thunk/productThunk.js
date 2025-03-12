import { createAsyncThunk } from "@reduxjs/toolkit";
import productService from "@services/product.service";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (
    { type, limit = 8, page, categoryIds = [] } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await productService.getProducts({
        type,
        limit,
        page,
        categoryIds,
      });

      // console.log("data", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

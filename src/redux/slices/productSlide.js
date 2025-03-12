import { getProducts } from "@redux/thunk/productThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

const setLoading = (state) => {
  state.loading = true;
};

const setFulfilled = (state) => {
  state.loading = false;
  state.error = null;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, setLoading)
      .addCase(getProducts.fulfilled, (state, action) => {
        setFulfilled(state);
        state.products = action.payload?.metadata;
      })
      .addCase(getProducts.rejected, setError);
  },
});

export default productSlice.reducer;

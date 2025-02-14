import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  updateQuantity,
  deleteItem,
  // deleteItem,
  // deleteAll,
} from "@redux/thunk/cartThunk";

const initialState = {
  cart: {},
  totalCartItems: 0,
  totalPrice: 0,
  error: "",
  loading: false,
  selectedProduct: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.totalCartItems = action.payload.totalCartItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.totalCartItems = action.payload.totalCartItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.totalCartItems = action.payload.totalCartItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.totalCartItems = action.payload.totalCartItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // .addCase(deleteAll.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(deleteAll.fulfilled, (state) => {
    //   state.loading = false;
    //   state.cart.cartItems = [];
    // })
    // .addCase(deleteAll.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { setSelectedProduct, setCart } = cartSlice.actions;
export default cartSlice.reducer;

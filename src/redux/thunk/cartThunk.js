import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (data, { rejectWithValue }) => {
    try {
      // get cart from localstorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      // console.log("getCart, cart: ", cart);
      return {
        cart,
        totalCartItems: cart.reduce((total, item) => total + item.quantity, 0),
        totalPrice: cart.reduce(
          (total, item) => total + item.finalPricePerOne * item.quantity,
          0
        ),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ data }, { rejectWithValue }) => {
    console.log("addToCart, data: ", data);
    try {
      // add to localstorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingCartItemIndex = cart.findIndex(
        (item) => item.variant.id === data.variant.id
      );
      const updatedCartItems = [...cart];
      // console.log("addToCart, existingCartItemIndex: ", existingCartItemIndex);
      if (existingCartItemIndex !== -1) {
        // Check if current quantity + added value is less than variant quantity
        if (
          updatedCartItems[existingCartItemIndex].quantity +
            Number(data.quantity) <=
          updatedCartItems[existingCartItemIndex].variant.quantity
        )
          updatedCartItems[existingCartItemIndex].quantity += Number(
            data.quantity
          );
        // If not, set quantity to variant quantity
        else {
          updatedCartItems[existingCartItemIndex].quantity =
            updatedCartItems[existingCartItemIndex].variant.quantity;
        }
      } else {
        updatedCartItems.push(data);
      }
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      console.log("addToCart, updatedCartItems: ", updatedCartItems);
      return {
        cart: updatedCartItems,
        totalCartItems: updatedCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
        totalPrice: cart.reduce(
          (total, item) => total + item.finalPricePerOne * item.quantity,
          0
        ),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ data }, { rejectWithValue }) => {
    try {
      // update quantity in localstorage
      console.log("updateQuantity, data: ", data);
      const cart = JSON.parse(localStorage.getItem("cart"));

      const updatedCartItems = cart.map((item) => {
        if (
          item.variant.id === data.variantId &&
          data.quantity > 0 &&
          data.quantity <= item.variant.quantity
        ) {
          return { ...item, quantity: Number(data.quantity) };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return {
        cart: updatedCartItems,
        totalCartItems: updatedCartItems.reduce(
          (total, item) => total + item.quantity,
          0
        ),
        totalPrice: updatedCartItems.reduce(
          (total, item) => total + item.finalPricePerOne * item.quantity,
          0
        ),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ variantId }, { rejectWithValue }) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("variantId: ", variantId);
      // Lọc bỏ sản phẩm có variantId tương ứng
      const newCart = cart.filter((item) => item.variant.id !== variantId);

      // Cập nhật localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        cart: newCart,
        totalCartItems: newCart.reduce(
          (total, item) => total + item.quantity,
          0
        ),
        totalPrice: newCart.reduce(
          (total, item) => total + item.finalPricePerOne * item.quantity,
          0
        ),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const deleteAll = createAsyncThunk(
//   "cart/deleteAll",
//   async ({ rejectWithValue }) => {
//     try {
//       // const response = await cartService.deleteAll(accessToken);
//       // return response;
//       // delete all items in localstorage
//       localStorage.removeItem("cart");
//       return [];
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

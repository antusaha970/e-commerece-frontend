import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemFromCart,
  loadItemsToCart,
  resetCart,
  updateCart,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response;
  }
);

export const getCartItemsAsync = createAsyncThunk(
  "cart/loadItemsToCart",
  async (id) => {
    const response = await loadItemsToCart(id);
    return response;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (item) => {
    const response = await updateCart(item);
    return response;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (item) => {
    const response = await deleteItemFromCart(item);
    return response;
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async (id) => {
  const response = await resetCart(id);
  return response;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(getCartItemsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateCartAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        console.log(action.payload.id);
        console.log(index);
        state.items.splice(index, 1);
      })
      .addCase(deleteItemFromCartAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

// export const { increment, decrement, incrementByAmount } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, loadItemsToCart } from "./cartAPI";

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
      });
  },
});

// export const { increment, decrement, incrementByAmount } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;

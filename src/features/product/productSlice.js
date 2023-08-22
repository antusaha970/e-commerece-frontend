import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchFilterProducts } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
};

export const getAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response;
  }
);
export const getFilterProductsAsync = createAsyncThunk(
  "product/fetchFilterProducts",
  async ({ filter, sort, pagination }) => {
    const response = await fetchFilterProducts(filter, sort, pagination);
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getFilterProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFilterProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getFilterProductsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

//Selectors
export const selectProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;

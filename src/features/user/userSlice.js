import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
};

export const fetchUserOrdersAsync = createAsyncThunk(
  "counter/fetchUserOrders",
  async (id) => {
    const response = await fetchUserOrders(id);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectLoggedInUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;

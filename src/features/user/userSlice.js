import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserInfo, fetchUserOrders, updateUser } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
  userInfo: null,
};

export const fetchUserOrdersAsync = createAsyncThunk(
  "user/fetchUserOrders",
  async (id) => {
    const response = await fetchUserOrders(id);
    return response;
  }
);
export const getLoggedInUserInfoAsync = createAsyncThunk(
  "user/fetchLoggedInUserInfo",
  async () => {
    const response = await fetchLoggedInUserInfo();
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    const response = await updateUser(userData);
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
      })
      .addCase(getLoggedInUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(getLoggedInUserInfoAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectLoggedInUserOrders = (state) => state.user.userOrders;
export const selectLoggedInUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, checkUser, createUser, signOut } from "./authAPI";
import { updateUserAsync } from "../user/userSlice";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  userChecked: false,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response;
  } catch (error) {
    return error;
  }
});

export const signOutAsync = createAsyncThunk("auth/signOut", async () => {
  const response = await signOut();
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.userChecked = false;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.userChecked = true;
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.userChecked = true;
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(signOutAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetAuthError } = authSlice.actions;

// Selectors
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectLoginError = (state) => state.auth.error;
export const selectLoginStatus = (state) => state.auth.status;
export const selectUserChecking = (state) => state.auth.userChecked;

export default authSlice.reducer;

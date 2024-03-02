import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authsAsyncThunk } from "../asyncThunk/auth.async";
import { googleLogout } from "@react-oauth/google";

export interface User {
  name: string;
  email: string;
  id: string;
  gender: string;
  avtar: string;
  role?: string | null;
  createdBy?: string | null;
}

interface AuthState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  status: "idle",
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "myPostSlice",
  initialState,
  reducers: {
    handleLogoutReducer: (state) => {
      googleLogout();
      state.token = null;
      state.user = null;
      state.status = "idle";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authsAsyncThunk.loginAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      authsAsyncThunk.loginAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: AuthState }>) => {
        state.status = "fulfilled";
        state.user = action.payload.data.user; // Access user property from payload
        state.token = action.payload.data.token;
      }
    );
    builder.addCase(authsAsyncThunk.loginAsyncThunk.rejected, (state) => {
      state.status = "rejected";
    });

    builder.addCase(authsAsyncThunk.googleAuthAsyncThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      authsAsyncThunk.googleAuthAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: AuthState }>) => {
        state.status = "fulfilled";
        state.user = action.payload.data.user; // Access user property from payload
        state.token = action.payload.data.token;
      }
    );
    builder.addCase(authsAsyncThunk.googleAuthAsyncThunk.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { handleLogoutReducer } = authSlice.actions;
export default authSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { authsAsyncThunk } from "../asyncThunk/auth.async"
import { googleLogout } from "@react-oauth/google"

export interface User {
  name: string
  email: string
  id: string
  gender: string
  avatar: any
  role?: string | null
  createdBy?: string | null
}

interface AuthState {
  status: "idle" | "pending" | "fulfilled" | "rejected"
  user: User | null
  access_token: string | null
  refresh_token: string | null
}

const initialState: AuthState = {
  status: "idle",
  access_token: null,
  refresh_token: null,
  user: null,
}

const authSlice = createSlice({
  name: "myPostSlice",
  initialState,
  reducers: {
    handleLogoutReducer: (state) => {
      state.access_token = null
      state.refresh_token = null
      state.user = null
      state.status = "idle"
      localStorage.removeItem("persist:root")
      googleLogout()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authsAsyncThunk.verifyOtpAsyncThunk.pending, (state) => {
      state.status = "pending"
    })
    builder.addCase(
      authsAsyncThunk.verifyOtpAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: AuthState }>) => {
        state.status = "fulfilled"
        state.user = action.payload.data.user // Access user property from payload
        state.access_token = action.payload.data.access_token
        state.refresh_token = action.payload.data.refresh_token
      }
    )
    builder.addCase(authsAsyncThunk.verifyOtpAsyncThunk.rejected, (state) => {
      state.status = "rejected"
    })

    builder.addCase(authsAsyncThunk.googleAuthAsyncThunk.pending, (state) => {
      state.status = "pending"
    })
    builder.addCase(
      authsAsyncThunk.googleAuthAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: AuthState }>) => {
        state.status = "fulfilled"
        state.user = action.payload.data.user // Access user property from payload
        state.access_token = action.payload.data.access_token
        state.refresh_token = action.payload.data.refresh_token
      }
    )
    builder.addCase(authsAsyncThunk.googleAuthAsyncThunk.rejected, (state) => {
      state.status = "rejected"
    })

    builder.addCase(
      authsAsyncThunk.genrateNewTokenAsyncThunk.pending,
      (state) => {
        state.status = "pending"
      }
    )
    builder.addCase(
      authsAsyncThunk.genrateNewTokenAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: AuthState }>) => {
        state.status = "fulfilled"
        state.access_token = action.payload.data.access_token
        state.refresh_token = action.payload.data.refresh_token
      }
    )
    builder.addCase(
      authsAsyncThunk.genrateNewTokenAsyncThunk.rejected,
      (state) => {
        state.status = "rejected"
      }
    )
  },
})

export const { handleLogoutReducer } = authSlice.actions
export default authSlice.reducer

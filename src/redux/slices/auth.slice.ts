import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { authsAsyncThunk } from "../asyncThunk/auth.async"
import { googleLogout } from "@react-oauth/google"
import { RequestStatus } from "../../utils/constants"

export interface iUserProfile {
  avatar?: {
    url: string
    public_id: string
  }
  avtar?: string // Typo? Should it be "avatar"?
  createdAt: string
  createdBy: string
  email: string
  gender: string
  id: string
  name: string
  public_id?: string
  role: string
  updatedAt: string
}

interface AuthState {
  status:
    | RequestStatus.Idle
    | RequestStatus.Pending
    | RequestStatus.Fulfilled
    | RequestStatus.Rejected
  user: iUserProfile | null
  access_token: string | null
  refresh_token: string | null
}

const initialState: AuthState = {
  status: RequestStatus.Idle,
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
      state.status = RequestStatus.Pending
      localStorage.removeItem("persist:root")
      googleLogout()
    },
    updateProfileReducer: (state: any, action) => {
      if (action?.payload) {
        const { url, public_id } = action?.payload
        state.user.avatar = { url: url, public_id: public_id }
      }
      return
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authsAsyncThunk.verifyOtpAsyncThunk.pending, (state) => {
      state.status = RequestStatus.Pending
    })
    builder.addCase(
      authsAsyncThunk.verifyOtpAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: AuthState }>) => {
        state.status = RequestStatus.Fulfilled
        state.user = action.payload.data.user // Access user property from payload
        state.access_token = action.payload.data.access_token
        state.refresh_token = action.payload.data.refresh_token
      }
    )
    builder.addCase(authsAsyncThunk.verifyOtpAsyncThunk.rejected, (state) => {
      state.status = RequestStatus.Rejected
    })

    builder.addCase(authsAsyncThunk.googleAuthAsyncThunk.pending, (state) => {
      state.status = RequestStatus.Pending
    })
    builder.addCase(
      authsAsyncThunk.googleAuthAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: AuthState }>) => {
        state.status = RequestStatus.Fulfilled
        state.user = action.payload.data.user // Access user property from payload
        state.access_token = action.payload.data.access_token
        state.refresh_token = action.payload.data.refresh_token
      }
    )
    builder.addCase(authsAsyncThunk.googleAuthAsyncThunk.rejected, (state) => {
      state.status = RequestStatus.Rejected
    })

    builder.addCase(
      authsAsyncThunk.genrateNewTokenAsyncThunk.pending,
      (state) => {
        state.status = RequestStatus.Pending
      }
    )
    builder.addCase(
      authsAsyncThunk.genrateNewTokenAsyncThunk.fulfilled,
      (state, action: PayloadAction<{ data: AuthState }>) => {
        state.status = RequestStatus.Fulfilled
        state.access_token = action.payload.data.access_token
        state.refresh_token = action.payload.data.refresh_token
      }
    )
    builder.addCase(
      authsAsyncThunk.genrateNewTokenAsyncThunk.rejected,
      (state) => {
        state.status = RequestStatus.Rejected
      }
    )
  },
})

export const { handleLogoutReducer, updateProfileReducer } = authSlice.actions
export default authSlice.reducer

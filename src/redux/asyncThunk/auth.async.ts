import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthService } from "../service/auth.service"
import {
  iChangePasswordForm,
  iForgotPasswordForm,
  iSignInForm,
} from "../../utils/interfaces"

export interface iRefreshTokenPayload {
  refreshToken: string | null
}
export interface iVerifyOtp {
  email: string
  otp: string
}
class AuthAsyncThunk {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  signUpAsyncThunk = createAsyncThunk(
    "signUpAsyncThunk",
    async (payload: FormData, { rejectWithValue }) => {
      try {
        const response = await this.authService.signUpService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  LogInAsyncThunk = createAsyncThunk(
    "LogInAsyncThunk",
    async (payload: iSignInForm, { rejectWithValue }) => {
      try {
        const response = await this.authService.logInService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  verifyOtpAsyncThunk = createAsyncThunk(
    "verifyOtpAsyncThunk",
    async (payload: iVerifyOtp, { rejectWithValue }) => {
      try {
        const response = await this.authService.verifyOtpService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  regenerateOTPAsyncThunk = createAsyncThunk(
    "regenerateOTPAsyncThunk",
    async (payload: { email: string }, { rejectWithValue }) => {
      try {
        const response = await this.authService.regenerateOTPService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  googleAuthAsyncThunk = createAsyncThunk(
    "googleAuthAsyncThunk",
    async (payload: { Gtoken: string }, { rejectWithValue }) => {
      try {
        const response = await this.authService.googleAuthService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  genrateNewTokenAsyncThunk = createAsyncThunk(
    "genrateNewTokenAsyncThunk",
    async (payload: iRefreshTokenPayload, { rejectWithValue }) => {
      try {
        const response = await this.authService.genrateNewTokenService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  changePasswordAsyncThunk = createAsyncThunk(
    "changePasswordAsyncThunk",
    async (payload: iChangePasswordForm, { rejectWithValue }) => {
      try {
        const response = await this.authService.changePasswordService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  sendOTPAsyncThunk = createAsyncThunk(
    "sendOTPAsyncThunk",
    async (payload: iForgotPasswordForm, { rejectWithValue }) => {
      try {
        const response = await this.authService.sendOTPService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  forgotPasswordAsyncThunk = createAsyncThunk(
    "sendOTPAsyncThunk",
    async (payload: iForgotPasswordForm, { rejectWithValue }) => {
      try {
        const response = await this.authService.forgotPasswordService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
}
export const authsAsyncThunk = new AuthAsyncThunk()

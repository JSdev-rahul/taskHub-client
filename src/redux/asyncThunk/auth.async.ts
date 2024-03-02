import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthService } from "../service/auth.service"

export interface LoginFormValues {
  email: string
  password: string
}
class AuthAsyncThunk {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  signUpAsyncThunk = createAsyncThunk(
    "userSignup",
    async (payload: any, { rejectWithValue }) => {
      try {
        const response = await this.authService.signUpService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  loginAsyncThunk = createAsyncThunk(
    "loginAsync",
    async (payload: LoginFormValues, { rejectWithValue }) => {
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
    async (payload: any, { rejectWithValue }) => {
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
    async (payload: any, { rejectWithValue }) => {
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
    async (payload: any, { rejectWithValue }) => {
      try {
        const response = await this.authService.googleAuthService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
}
export const authsAsyncThunk = new AuthAsyncThunk()

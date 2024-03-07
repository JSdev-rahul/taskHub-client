import { createAsyncThunk } from "@reduxjs/toolkit"
import { AuthService } from "../service/auth.service"
import { iSignInForm } from "../../utils/interfaces"

export interface RefreshTokenPayload {
  refreshToken: string | null
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
  signInAsyncThunk = createAsyncThunk(
    "loginAsync",
    async (payload: iSignInForm, { rejectWithValue }) => {
      try {
        const response = await this.authService.signInService(payload)
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
  genrateNewTokenAsyncThunk = createAsyncThunk(
    "genrateNewTokenAsyncThunk",
    async (payload: RefreshTokenPayload, { rejectWithValue }) => {
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
    async (payload: any, { rejectWithValue }) => {
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
    async (payload: any, { rejectWithValue }) => {
      try {
        const response = await this.authService.sendEmailOtpService(payload)
        return response
      } catch (err) {
        return rejectWithValue(err)
      }
    }
  )
  forgotPasswordAsyncThunk = createAsyncThunk(
    "sendOTPAsyncThunk",
    async (payload: any, { rejectWithValue }) => {
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

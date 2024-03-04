import { APIEndpoints } from "../../api/api_endpoints"
import { LoginFormValues, RefreshTokenPayload } from "../asyncThunk/auth.async"
import { sendRequest } from "../constant/fetchApiHandler"
import { METHODS } from "../constant/redux.constant"

export class AuthService {
  signUpService = async (payload: any) => {
    const url = APIEndpoints.signUp
    return sendRequest(url, METHODS.POST, payload)
  }
  logInService = (payload: LoginFormValues) => {
    const url = APIEndpoints.login
    return sendRequest(url, METHODS.POST, payload)
  }
  verifyOtpService = (payload: any) => {
    const url = APIEndpoints.verifyOtp
    return sendRequest(url, METHODS.POST, payload)
  }
  regenerateOTPService = (payload: any) => {
    const url = APIEndpoints.regenerateOtp
    return sendRequest(url, METHODS.POST, payload)
  }
  googleAuthService = (payload: any) => {
    const url = APIEndpoints.googleLogin
    return sendRequest(url, METHODS.POST, payload)
  }
  genrateNewTokenService = (payload: RefreshTokenPayload) => {
    const url = APIEndpoints.generateAccessToken
    return sendRequest(url, METHODS.POST, payload)
  }
}

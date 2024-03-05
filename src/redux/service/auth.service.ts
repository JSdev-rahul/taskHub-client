import { API_ENDPOINT } from "../../api/api_endpoints"
import { LoginFormValues, RefreshTokenPayload } from "../asyncThunk/auth.async"
import { sendRequest } from "../constant/fetchApiHandler"
import { METHODS } from "../constant/redux.constant"

export class AuthService {
  signUpService = async (payload: any) => {
    const url = API_ENDPOINT.SIGNUP
    return sendRequest(url, METHODS.POST, payload)
  }
  logInService = (payload: LoginFormValues) => {
    const url = API_ENDPOINT.LOGIN
    return sendRequest(url, METHODS.POST, payload)
  }
  verifyOtpService = (payload: any) => {
    const url = API_ENDPOINT.VERIFY_OTP
    return sendRequest(url, METHODS.POST, payload)
  }
  regenerateOTPService = (payload: any) => {
    const url = API_ENDPOINT.REGENRATE_OTP
    return sendRequest(url, METHODS.POST, payload)
  }
  googleAuthService = (payload: any) => {
    const url = API_ENDPOINT.GOOGLE_LOGIN
    return sendRequest(url, METHODS.POST, payload)
  }
  genrateNewTokenService = (payload: RefreshTokenPayload) => {
    const url = API_ENDPOINT.GENERATE_ACCESS_TOKEN
    return sendRequest(url, METHODS.POST, payload)
  }
}

import { API_ENDPOINT } from "../../api/api_endpoints"
import {
  iChangePasswordForm,
  iForgotPasswordForm,
  iSignInForm,
} from "../../utils/interfaces"
import { iRefreshTokenPayload, iVerifyOtp } from "../asyncThunk/auth.async"
import { sendRequest } from "../constant/fetchApiHandler"
import { METHODS } from "../constant/redux.constant"

export class AuthService {
  signUpService = async (payload: FormData) => {
    const url = API_ENDPOINT.SIGNUP
    return sendRequest(url, METHODS.POST, payload)
  }
  logInService = (payload: iSignInForm) => {
    const url = API_ENDPOINT.LOGIN
    return sendRequest(url, METHODS.POST, payload)
  }
  verifyOtpService = (payload: iVerifyOtp) => {
    const url = API_ENDPOINT.VERIFY_OTP
    return sendRequest(url, METHODS.POST, payload)
  }
  regenerateOTPService = (payload: { email: string }) => {
    const url = API_ENDPOINT.REGENRATE_OTP
    return sendRequest(url, METHODS.POST, payload)
  }
  googleAuthService = (payload: { Gtoken: string }) => {
    const url = API_ENDPOINT.GOOGLE_LOGIN
    return sendRequest(url, METHODS.POST, payload)
  }
  genrateNewTokenService = (payload: iRefreshTokenPayload) => {
    const url = API_ENDPOINT.GENERATE_ACCESS_TOKEN
    return sendRequest(url, METHODS.POST, payload)
  }

  changePasswordService = (payload: iChangePasswordForm) => {
    const url = API_ENDPOINT.CHANGE_PASSWORD
    return sendRequest(url, METHODS.PATCH, payload)
  }

  sendOTPService = (payload: iForgotPasswordForm) => {
    const url = API_ENDPOINT.SEND_OTP
    return sendRequest(url, METHODS.POST, payload)
  }
  forgotPasswordService = (payload: iForgotPasswordForm) => {
    const url = API_ENDPOINT.FORGOT_PASSWORD
    return sendRequest(url, METHODS.POST, payload)
  }
}

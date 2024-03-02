import { APIEndPoints } from "../../api/api_endpoints"
import { LoginFormValues } from "../asyncThunk/auth.async"
import { sendRequest } from "../constant/fetchApiHandler"
import { METHODS } from "../constant/redux.constant"

export class AuthService {
  signUpService = async (payload: any) => {
    const url = APIEndPoints.signUp
    return sendRequest(url, METHODS.POST, payload)
  }
  logInService = (payload: LoginFormValues) => {
    const url = APIEndPoints.login
    return sendRequest(url, METHODS.POST, payload)
  }
  verifyOtpService = (payload: any) => {
    const url = APIEndPoints.verifyOtp
    return sendRequest(url, METHODS.POST, payload)
  }
  regenerateOTPService = (payload: any) => {
    const url = APIEndPoints.regenerateOTP
    return sendRequest(url, METHODS.POST, payload)
  }
  googleAuthService = (payload: any) => {
    const url = APIEndPoints.googleLogin
    return sendRequest(url, METHODS.POST, payload)
  }
}

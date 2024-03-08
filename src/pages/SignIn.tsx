import React, { useEffect, useState } from "react"
import { InputField } from "../components/Input"
import { useFormik } from "formik"
import { useAppDispatch } from "../hooks/utilityHooks"
import { authsAsyncThunk } from "../redux/asyncThunk/auth.async"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { routingConfig } from "../routes/routes"
import OtpComponent from "../components/OtpComponent"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { iSignInForm } from "../utils/interfaces"
import SigninValidationSchema from "../validator/signInSchema"

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [otp, setOtp] = useState<string>("")
  const [isOtpPage, setIsOtpPage] = useState<boolean>(false)
  const [time, setTime] = useState<number>(180)
  const [timer, setTimer] = useState<any>(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<iSignInForm>({
    email: "super-admin@gmail.com",
    password: "admin123",
  })

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: SigninValidationSchema,
    onSubmit: (values) => {
      clearInterval(timer)
      setIsDisabled(true)
      dispatch(authsAsyncThunk.LogInAsyncThunk(values))
        .unwrap()
        .then(() => {
          setIsOtpPage(true)
          handleTimer()
        })
        .catch(() => {})
        .finally(() => {
          setIsDisabled(false)
        })
    },
  })

  useEffect(() => {
    return () => {
      clearInterval(timer) // Clear timer on unmount
      setIsOtpPage(false) // Reset isLoggedIn state
      setTime(180) // Reset timer
    }
  }, [timer])

  const handleOtpVerification = () => {
    const email = formik.values.email
    dispatch(authsAsyncThunk.verifyOtpAsyncThunk({ email, otp }))
      .unwrap()
      .then(() => {
        navigate(routingConfig.home)
      })
      .catch(() => {})
  }

  const handleRegenerateOTP = () => {
    clearInterval(timer) // Clear existing timer
    setTime(180) // Reset timer
    const email = formik.values.email
    dispatch(authsAsyncThunk.regenerateOTPAsyncThunk({ email }))
      .unwrap()
      .then()
      .catch()
  }

  const handleTimer = () => {
    setTimer(
      setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer) // Clear timer when time reaches 0
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    )
  }

  const handleLoginSuccess = (credentialResponse: any) => {
    const Gtoken: string | undefined = credentialResponse.credential
    if (Gtoken) {
      dispatch(authsAsyncThunk.googleAuthAsyncThunk({ Gtoken }))
        .unwrap()
        .then((res: any) => {
          if (res) {
            navigate(routingConfig.home)
          }
        })
        .catch(() => {})
    }
  }

  return isOtpPage ? (
    <OtpComponent
      otp={otp}
      setOtp={setOtp}
      handleRegenerateOTP={handleRegenerateOTP}
      handleOtpVerification={handleOtpVerification}
      setTime={setTime}
      setIsOtpPage={setIsOtpPage}
      time={time}
      timer={timer}
    />
  ) : (
    <div className="dark:bg-slate-900  flex h-full items-center py-10 drop-shadow-2xl">
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <div className="w-full flex items-center justify-center">
                <GoogleOAuthProvider clientId="463926368803-251uf5djjqvvph7g8ff643fofoei9ari.apps.googleusercontent.com">
                  <GoogleLogin
                    logo_alignment={"center"}
                    size={"large"}
                    shape={"circle"}
                    cancel_on_tap_outside={true}
                    onSuccess={(credentialResponse) =>
                      handleLoginSuccess(credentialResponse)
                    }
                    onError={() => {}}
                    useOneTap={true}
                  />
                </GoogleOAuthProvider>
              </div>
              <p className="text-xs mt-2 dark:text-white">Or</p>

              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Don't have an account yet?{" "}
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href={routingConfig.signup}
                >
                  Sign up here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-y-4">
                  <InputField
                    label="Email address"
                    type="text"
                    id="email"
                    name="email"
                    error={formik.errors.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />

                  <div>
                    <div className="flex justify-between items-center"></div>
                    <div className="relative">
                      <InputField
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        error={formik.errors.password}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </div>
                  </div>
                  <Button label="Sign In" disabled={isDisabled}></Button>
                  <div className="flex justify-between items-center sm:mt-[-15px]">
                    <div>
                      <button
                        onClick={() => navigate(routingConfig.changePassword)}
                        className="text-xs dark:text-white text-black underline"
                      >
                        Change Password
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => navigate(routingConfig.forgotPassword)}
                        className="text-xs dark:text-white text-black underline"
                      >
                        Forgot Password
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignIn

/* eslint-disable */

import { useNavigate } from "react-router-dom"
import { routingConfig } from "../routes/routes"
import { InputField } from "../components/Input"
import { useAppDispatch } from "../hooks/utilityHooks"
import { useFormik } from "formik"
import { authsAsyncThunk } from "../redux/asyncThunk/auth.async"
import OtpComponent from "../components/OtpComponent"
import { handleTimer } from "../utils/handleOTPTimer"
import {
  emailSchema,
  newPasswordSchema,
} from "../validator/changePasswordSchema"
import { iForgotPasswordForm } from "../utils/interfaces"
import { useState } from "react"
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(false)
  const dispatch = useAppDispatch()
  const [initialValues, setInitialValues] = useState<iForgotPasswordForm>({
    email: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [otp, setOtp] = useState<string>("")
  const [time, setTime] = useState<number>(180)
  const [timer, setTimer] = useState<any>(null)
  const [isOtpPage, setIsOtpPage] = useState<boolean>(false)
  const [toggleNewPasswordFiled, setToggleNewPasswordFiled] = useState(false)
  const [isOtpSubmit, setIsOtpSubmit] = useState<boolean>(false)

  const formik = useFormik<iForgotPasswordForm>({
    initialValues,
    validationSchema: toggleNewPasswordFiled ? newPasswordSchema : emailSchema,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (value) => {
      setIsDisabled(true)
      if (toggleNewPasswordFiled) {
        dispatch(authsAsyncThunk.forgotPasswordAsyncThunk(value))
          .unwrap()
          .then(() => {
            navigate(routingConfig.login)
          })
          .catch(() => {})
          .finally(() => {
            setIsDisabled(false)
          })
      } else {
        dispatch(authsAsyncThunk.sendOTPAsyncThunk(value))
          .unwrap()
          .then(() => {
            handleTimer(setTimer, setTime, timer)
            setIsOtpPage(true)
          })
          .catch(() => {})
          .finally(() => {
            setIsDisabled(false)
          })
      }
    },
  })

  const handleOtpVerification = () => {
    setIsOtpSubmit(true)
    const email = formik.values.email
    dispatch(authsAsyncThunk.verifyOtpAsyncThunk({ email, otp }))
      .unwrap()
      .then(() => {
        setIsOtpSubmit(false)
        setIsOtpPage(false)
        setToggleNewPasswordFiled(true)

        // navigate(routingConfig.home)
      })
      .catch(() => {
        setIsOtpSubmit(false)
      })
  }

  const handleRegenerateOTP = () => {
    clearInterval(timer) // Clear existing timer
    setTime(180) // Reset timer
    const email = formik.values?.email
    dispatch(authsAsyncThunk.regenerateOTPAsyncThunk({ email }))
      .unwrap()
      .then(() => {})
      .catch(() => {})
  }

  return (
    <>
      {isOtpPage ? (
        <OtpComponent
          otp={otp}
          setOtp={setOtp}
          handleRegenerateOTP={handleRegenerateOTP}
          handleOtpVerification={handleOtpVerification}
          setTime={setTime}
          setIsOtpPage={setIsOtpPage}
          time={time}
          timer={timer}
          isOtpSubmit={isOtpSubmit}
        />
      ) : (
        <html className="h-full">
          <body className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
            <main className="w-full max-w-md mx-auto p-6">
              <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                      Forgot password?
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Remember your password?
                      <button
                        onClick={() => navigate(routingConfig.login)}
                        className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>

                  <div className="mt-5">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="grid gap-y-4">
                        {toggleNewPasswordFiled ? (
                          <>
                            {" "}
                            <div className="relative">
                              <InputField
                                label="New password"
                                type="text"
                                id="newPassword"
                                name="newPassword"
                                error={formik.errors.newPassword}
                                onChange={formik.handleChange}
                                value={formik.values.newPassword}
                              />
                            </div>
                            <div className="relative">
                              <InputField
                                label="Confirm Password"
                                type="text"
                                id="confirmPassword"
                                name="confirmPassword"
                                error={formik.errors.confirmPassword}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                              />
                            </div>
                          </>
                        ) : (
                          <div className="relative">
                            <InputField
                              label="Email address"
                              type="text"
                              id="email"
                              name="email"
                              error={formik.errors.email}
                              onChange={formik.handleChange}
                              value={formik.values.email}
                            />
                          </div>
                        )}

                        <button
                          disabled={isDisabled}
                          type="submit"
                          className=" disabled:bg-slate-400 disabled:cursor-not-allowed  w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50  dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          {toggleNewPasswordFiled
                            ? "Forgot Password"
                            : " Send OTP"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </body>
        </html>
      )}
    </>
  )
}

export default ForgotPassword

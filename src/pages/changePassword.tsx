import React, { useState } from "react"
import { routingConfig } from "../routes/routes"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { InputField } from "../components/Input"
import { useAppDispatch } from "../hooks/utilityHooks"
import { authsAsyncThunk } from "../redux/asyncThunk/auth.async"
import { changePasswordSchema } from "../validator/changePasswordSchema"

const ChangePassword = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (value) => {
      setIsDisabled(true)
      dispatch(authsAsyncThunk.changePasswordAsyncThunk(value))
        .unwrap()
        .then(() => {
          navigate(routingConfig.login)
        })
        .catch(() => {})
        .finally(() => {
          setIsDisabled(false)
        })
    },
  })

  return (
    <>
      <html className="h-full">
        <body className="dark:bg-slate-900 bg-gray-100 flex h-full items-center ">
          <main className="w-full max-w-md mx-auto p-3">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Change Password
                  </h1>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <button
                      onClick={() => navigate(routingConfig.login)}
                      className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Sign in
                    </button>
                  </p>
                </div>

                <div className="mt-5">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-y-4">
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

                      <div>
                        <InputField
                          label="Old password"
                          type="text"
                          id="oldPassword"
                          name="oldPassword"
                          error={formik.errors.oldPassword}
                          onChange={formik.handleChange}
                          value={formik.values.oldPassword}
                        />
                      </div>
                      <div>
                        <InputField
                          label="New Password"
                          type="text"
                          id="newPassword"
                          name="newPassword"
                          error={formik.errors.newPassword}
                          onChange={formik.handleChange}
                          value={formik.values.newPassword}
                        />
                      </div>
                      <div>
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

                      <button
                        disabled={isDisabled}
                        type="submit"
                        className=" disabled:bg-slate-400 disabled:cursor-not-allowed w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </body>
      </html>
    </>
  )
}

export default ChangePassword

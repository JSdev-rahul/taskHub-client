/* eslint-disable */

import React, { useState } from "react"
import { InputField } from "../components/Input"
import { useFormik } from "formik"
import CheckBox from "../components/CheckBox"
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import Lottie, { Options } from "react-lottie"
import "filepond/dist/filepond.min.css"
import { SignUpLottie } from "../assets"
import { objectToFormData } from "../utils/formDataConvert"
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks"
import { authsAsyncThunk } from "../redux/asyncThunk/auth.async"
import Button from "../components/Button"
import SelectComponent from "../components/SelectComponent"
import { routingConfig } from "../routes/routes"
import { AUTH_ROLE } from "../utils/constants"
import SignupValidationSchema from "../validator/signupSchema"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"

// Import the plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { iSignUpForm } from "../utils/interfaces"

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview)
interface iSignUpProps {
  isCreateNewUser?: boolean
}

const SignUp: React.FC<iSignUpProps> = ({ isCreateNewUser }) => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const [files, setFiles] = useState<any>([])
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: SignUpLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const [initialValues, setInitialValues] = useState<iSignUpForm>({
    name: "",
    gender: "",
    email: "",
    password: "",
    avatar: "",
    role: "user",
    createdBy: isCreateNewUser ? user?.id : "user",
  })

  const formik = useFormik<iSignUpForm>({
    initialValues,
    validateOnBlur: true,
    validateOnMount: false,
    validationSchema: SignupValidationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      setIsDisabled(true)
      const formData = objectToFormData(values)
      // const entries = formData.entries()
      // for (let entry = entries.next(); !entry.done; entry = entries.next()) {
      //   const [key, value] = entry.value
      // }

      dispatch(authsAsyncThunk.signUpAsyncThunk(formData))
        .unwrap()
        .then(() => {
          setIsDisabled(false)
          formik.resetForm()
          setFiles([])
        })
        .catch(() => {
          setIsDisabled(false)
        })
    },
  })

  return (
    <div
      className={`${!isCreateNewUser ? "grid grid-cols-2 h-screen" : "p-6"}`}
    >
      {/* Left side - Registration Form */}
      <div
        className={`flex justify-center ${
          isCreateNewUser ? "" : "items-center h-screen"
        } bg-[#F3F8FF]  dark:bg-slate-400`}
      >
        <div className="bg-[#F3F8FF] dark:bg-slate-400">
          <div className="flex justify-center">
            <p className="mt-2 text-sm text-gray-600 dark:text-white">
              Already have an account?{" "}
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href={routingConfig.login}
              >
                Login here
              </a>
            </p>
          </div>
          <div
            className={` ${
              isCreateNewUser ? "p-3" : ""
            } h-full flex justify-center`}
          >
            <div className="mt-5">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex gap-4">
                  <div className="w-56 ">
                    <InputField
                      label="Name"
                      type="text"
                      id="name"
                      name="name"
                      error={formik.errors.name}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>
                  <div>
                    <label className="dark:text-white text-black">Gender</label>
                    <div className="flex items-center gap-7 mt-[8px]">
                      <div>
                        <CheckBox
                          label="Female"
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          error={formik.errors.gender}
                          checked={formik.values.gender === "female"} // Check if gender value is 'female'
                          onChange={formik.handleChange} // Handle input change
                        />
                      </div>
                      <div>
                        <CheckBox
                          label="Male"
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          error={formik.errors.gender}
                          checked={formik.values.gender === "male"} // Check if gender value is 'female'
                          onChange={formik.handleChange} // Handle input change
                        />
                      </div>
                    </div>
                    {formik.errors.gender ? (
                      <span className="text-xs text-error">
                        *{formik.errors.gender}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="flex  gap-4 mt-4">
                  <div className="w-56">
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
                  <div className="w-56 ">
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
                {isCreateNewUser && (
                  <div className="mt-2">
                    <SelectComponent
                      value={formik.values.role}
                      id="role"
                      name="role"
                      onChange={formik.handleChange}
                      title="Select Role"
                      options={AUTH_ROLE}
                    />
                  </div>
                )}
                <div className="files mt-5">
                  <FilePond
                    // server={"/"}
                    credits={false}
                    acceptedFileTypes={["image/png", "image/jpeg"]}
                    files={files}
                    onupdatefiles={(fileItems) => {
                      if (fileItems && fileItems.length > 0) {
                        setFiles(fileItems[0].file)
                        formik.setFieldValue("avatar", fileItems[0].file)
                      } else {
                        setFiles([])
                      }
                      setFiles(fileItems)
                    }}
                    // allowImagePreview={true}
                    allowMultiple={false}
                    maxFiles={1}
                    name="avatar"
                    labelIdle="Browse or Drag and Drop your Avatar"
                  />

                  {formik.errors.avatar ? (
                    <div className="mt-[-18px] mb-[10px]">
                      <span className="text-xs text-error">
                        *{formik.errors.avatar}
                      </span>
                    </div>
                  ) : null}
                </div>

                <Button label="Register" disabled={isDisabled}></Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Right side - "lotifile" section */}
      {!isCreateNewUser && (
        <div
          className={`flex justify-center items-center h-screen cursor-none`}
        >
          <div>
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp

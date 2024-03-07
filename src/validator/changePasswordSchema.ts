import * as yup from "yup"

export const changePasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
})

export const emailSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
})

export const newPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
})

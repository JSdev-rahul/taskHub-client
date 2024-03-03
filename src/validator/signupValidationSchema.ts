import * as Yup from "yup"

const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  avatar: Yup.string().required("Avatar is required"),
})

export default signupValidationSchema

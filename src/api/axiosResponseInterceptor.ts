import axios from "axios"
import { useNavigate } from "react-router-dom"
import { routingConfig } from "../routes/routes"
import { ToastMessage } from "../components/TosterMessage"
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks"
import { handleLogoutReducer } from "../redux/slices/auth.slice"
import { authsAsyncThunk } from "../redux/asyncThunk/auth.async"

const useAxiosResponseInterceptor = () => {
  const { refresh_token } = useAppSelector((state) => state?.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  axios.interceptors.response.use(
    (response) => {
      if (response?.data?.message) {
        ToastMessage("success", "success", response?.data.message)
      }

      return response
    },
    (error) => {
      // Handle errors
      if (error.response) {
        // Server responded with an error status code
        const statusCode = error.response.status
        const message = error.response?.data?.message
        if (statusCode === 401) {
          dispatch(
            authsAsyncThunk.genrateNewTokenAsyncThunk({
              refreshToken: refresh_token,
            })
          )
            .unwrap()
            .then(() => {})
            .catch((err: any) => {
              dispatch(handleLogoutReducer())
              navigate(routingConfig.login)
            })
          //
          // Unauthorized: Redirect to login page or handle authentication logic
          //
        } else {
          // Other error status codes: Display generic error message
          ToastMessage(
            "error",
            "error",
            message ? message : "Something went wrong"
          )
        }
      } else if (error.request) {
        // Request made but no response received (e.g., network error)
        ToastMessage("error", "error", "Network error. Please try again later.")
      } else {
        // Something else happened during the request
        ToastMessage("error", "error", "An unexpected error occurred.")
      }

      return Promise.reject(error)
    }
  )
}

export default useAxiosResponseInterceptor

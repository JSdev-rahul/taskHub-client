import axios from "axios"
import { useAppSelector } from "../hooks/utilityHooks"

const useAxiosRequestInterceptor = () => {
  const { token } = useAppSelector((state) => state.auth)
  // const baseURL = ;
  const configValue: string = process.env.REACT_APP_API_BASE_URL as string

  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = "Bearer " + token
      }
      config.baseURL = configValue
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )
}

export default useAxiosRequestInterceptor

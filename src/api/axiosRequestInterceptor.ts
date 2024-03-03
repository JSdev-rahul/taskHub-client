import { useEffect } from "react"
import axios from "axios"

const useAxiosRequestInterceptor = (access_token: string | null) => {
  useEffect(() => {
    const configValue: string = process.env.REACT_APP_API_BASE_URL as string

    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (access_token) {
          config.headers["Authorization"] = "Bearer " + access_token
        }
        config.baseURL = configValue
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Clean up interceptor when unmounting or when access_token changes
    return () => {
      axios.interceptors.request.eject(interceptor)
    }
  }, [access_token]) // Re-run effect when access_token changes

  // Return nothing as this hook is primarily for setting up the interceptor
}

export default useAxiosRequestInterceptor

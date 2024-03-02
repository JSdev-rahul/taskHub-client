import { useAppSelector } from "./hooks/utilityHooks"
import AppRouting from "./routes/AppRouting"
import useAxiosRequestInterceptor from "./api/axiosRequestInterceptor"
import useAxiosResponseInterceptor from "./api/axiosResponseInterceptor"

function App() {
  const { darkMode } = useAppSelector((state) => state.uimode)
  const configValue = process.env.REACT_APP_API_BASE_URL

  useAxiosRequestInterceptor()
  useAxiosResponseInterceptor()
  const { token } = useAppSelector((state) => state.auth)

  return (
    <div className={darkMode ? "dark bg-slate-500 h-screen" : "h-screen"}>
      <AppRouting token={token} />
    </div>
  )
}

export default App

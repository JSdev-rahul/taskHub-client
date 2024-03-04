import { useAppSelector } from "./hooks/utilityHooks"
import AppRouting from "./routes/AppRouting"
import useAxiosResponseInterceptor from "./api/axiosResponseInterceptor"
import useAxiosRequestInterceptor from "./api/axiosRequestInterceptor"
function App() {
  const { darkMode } = useAppSelector((state) => state.uimode)
  const { access_token } = useAppSelector((state) => state.auth)
  useAxiosRequestInterceptor(access_token)
  useAxiosResponseInterceptor()
  return (
    <div className={darkMode ? "dark bg-slate-500 h-screen" : "h-screen"}>
      <AppRouting access_token={access_token} />
    </div>
  )
}

export default App

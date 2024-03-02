// AppRouting.tsx

import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Loading from "../components/Loading"
import { ProtectedRoute } from "./index"
import { routingConfig } from "./routes"
import { useAppSelector } from "../hooks/utilityHooks"
import Profile from "../pages/Profile"

const MainLayout = lazy(() => import("../layout/mainLayout"))
const SignInPage = lazy(() => import("../pages/SignIn"))
const SignUpPage = lazy(() => import("../pages/SignUp"))
const HomePage = lazy(() => import("../pages/Home"))

const AppRouting = ({ token }: { token: string | null }) => {
  const { user } = useAppSelector((state) => state.auth)
  const userAuth = ["user", "admin"]
  const adminAuth = ["admin"]
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={routingConfig.login} element={<SignInPage />} />
        <Route path={routingConfig.signup} element={<SignUpPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route
            path={routingConfig.home}
            element={
              <ProtectedRoute token={token} authorized={userAuth}>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path={routingConfig.profile}
            element={
              <ProtectedRoute token={token} authorized={adminAuth}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRouting

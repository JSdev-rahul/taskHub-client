// AppRouting.tsx

import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Loading from "../components/Loading"
import { ProtectedRoute } from "./index"
import { routingConfig } from "./routes"
import { Roles } from "../utils/constants"
import ChangePassword from "../pages/changePassword"
import ForgotPassword from "../pages/ForgotPassword"

const MainLayout = lazy(() => import("../layout/mainLayout"))
const SignInPage = lazy(() => import("../pages/SignIn"))
const SignUpPage = lazy(() => import("../pages/SignUp"))
const HomePage = lazy(() => import("../pages/Home"))
const UserPage = lazy(() => import("../pages/Users"))
const ProfilePage = lazy(() => import("../pages/Profile"))
const AppRouting = ({ access_token }: { access_token: string | null }) => {
  const publicAuthAccessList = [Roles.USER, Roles.ADMIN]
  const privateAuthAccessList = [Roles.ADMIN]
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="*" element={<Navigate to={routingConfig.login} />} />{" "}
        <Route path={routingConfig.login} element={<SignInPage />} />
        <Route path={routingConfig.signup} element={<SignUpPage />} />
        <Route
          path={routingConfig.changePassword}
          element={<ChangePassword />}
        />
        <Route
          path={routingConfig.forgotPassword}
          element={<ForgotPassword />}
        />
        <Route path="/" element={<MainLayout />}>
          <Route
            path={routingConfig.home}
            element={
              <ProtectedRoute authorized={publicAuthAccessList}>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path={routingConfig.profile}
            element={
              <ProtectedRoute authorized={publicAuthAccessList}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={routingConfig.users}
            element={
              <ProtectedRoute authorized={privateAuthAccessList}>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRouting

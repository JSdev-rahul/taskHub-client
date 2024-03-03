// AppRouting.tsx

import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import Loading from "../components/Loading"
import { ProtectedRoute } from "./index"
import { routingConfig } from "./routes"
import Profile from "../pages/Profile"

const MainLayout = lazy(() => import("../layout/mainLayout"))
const SignInPage = lazy(() => import("../pages/SignIn"))
const SignUpPage = lazy(() => import("../pages/SignUp"))
const HomePage = lazy(() => import("../pages/Home"))

const AppRouting = ({ access_token }: { access_token: string | null }) => {
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
              <ProtectedRoute
                // access_token={access_token}
                authorized={userAuth}
              >
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path={routingConfig.profile}
            element={
              <ProtectedRoute
                // access_token={access_token}
                authorized={adminAuth}
              >
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

import { useNavigate } from "react-router-dom"
import { routingConfig } from "./routes"
import { useEffect, useLayoutEffect } from "react"
import { useAppSelector } from "../hooks/utilityHooks"

interface ProtectedRouteProps {
  // access_token: string | null
  authorized: any
  children: JSX.Element
}

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({
  // access_token,
  authorized,
  children,
}) => {
  const { user, access_token } = useAppSelector((state) => state?.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!access_token) {
      navigate(routingConfig.login)
    }
    if (!authorized.includes(user?.role)) {
      navigate(routingConfig.login)
    } else {
    }
  }, [access_token, navigate])
  return access_token ? children : null
}

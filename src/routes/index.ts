import { useNavigate } from "react-router-dom"
import { routingConfig } from "./routes"
import { useEffect, useLayoutEffect } from "react"
import { useAppSelector } from "../hooks/utilityHooks"

interface ProtectedRouteProps {
  token: string | null
  authorized: any
  children: JSX.Element
}

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({
  token,
  authorized,
  children,
}) => {
  const { user } = useAppSelector((state) => state?.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate(routingConfig.login)
    }
    if (!authorized.includes(user?.role)) {
      navigate(routingConfig.login)
    } else {
    }
  }, [token, navigate])
  return token ? children : null
}

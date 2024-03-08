import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAppSelector } from "../hooks/utilityHooks"
import { routingConfig } from "./routes"

interface ProtectedRouteProps {
  authorized: any
  children: JSX.Element
}

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({
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
  }, [access_token, navigate, user?.role, authorized])
  return access_token ? children : null
}

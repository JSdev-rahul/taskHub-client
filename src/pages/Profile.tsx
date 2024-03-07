import { lazy } from "react"
import { useAppSelector } from "../hooks/utilityHooks"
const UserProfileCard = lazy(() => import("../components/UserProfile"))

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth)
  return <UserProfileCard user={user} />
}

export default Profile

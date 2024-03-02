import UserProfileCard from "../components/Profile";
import { useAppSelector } from "../hooks/utilityHooks";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  return <UserProfileCard user={user} />;
};

export default Profile;

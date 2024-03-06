import React, { memo } from "react"
import { iUserProfile } from "../utils/componentProps"

const UserInfoCard: React.FC<iUserProfile> = ({
  userName,
  userRole,
  userEmail,
  userGender,
}) => {
  return (
    <div className="px-4 mt">
      <div className="flex w-full justify-center flex-col text-center ">
        <h2 className="text-xl dark:text-white font-semibold mb-2">
          {userName}
        </h2>
        <span className=" text-black text-xs dark:text-slate-300 mt-[-10px] underline">
          {userRole}
        </span>
      </div>
      <p className="text-gray-600 mb-2 dark:text-slate-300">
        Email: {userEmail}
      </p>
      <p className="text-gray-600 mb-4 dark:text-slate-300">
        Gender: {userGender}
      </p>
    </div>
  )
}

export default memo(UserInfoCard)

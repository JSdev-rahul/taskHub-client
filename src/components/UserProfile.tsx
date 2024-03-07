import React, { lazy, memo, useEffect, useState } from "react"
import { useAppDispatch } from "../hooks/utilityHooks"
import { usersAsyncThunk } from "../redux/asyncThunk/user.asyns"
import { objectToFormData } from "../utils/formDataConvert"
import { iUserProfile, updateProfileReducer } from "../redux/slices/auth.slice"
const AvatarUpload = lazy(() => import("./AvatarUpload"))
const UserInfoCard = lazy(() => import("./UserInfoCard"))

const UserProfileCard: React.FC<iUserProfile | any> = ({ user }) => {
  const dispatch = useAppDispatch()
  const [files, setFiles] = useState<any>()

  const handleFile = (e: any) => {
    setFiles(e?.target?.files[0])
  }

  useEffect(() => {
    if (files) {
      const data = objectToFormData({ avatar: files })
      dispatch(usersAsyncThunk.updateAvatarAsyncThunk(data))
        .then((res: any) => {
          setFiles(null)
          dispatch(updateProfileReducer(res?.payload?.data?.avatar))
        })
        .catch()
        .finally(() => {
          setFiles(null)
        })
    } else {
      setFiles(null)
    }
  }, [files])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-slate-900 shadow-2xl dark:shadow-inner rounded-lg overflow-hidden max-w-sm ">
        <AvatarUpload
          userAvatar={user?.avatar}
          handleFile={handleFile}
          files={files}
        />
        <UserInfoCard
          userName={user?.name}
          userRole={user?.role}
          userEmail={user?.email}
          userGender={user?.gender}
        />
      </div>
    </div>
  )
}

export default memo(UserProfileCard)

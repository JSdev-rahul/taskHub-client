import React, { useEffect, useState } from "react"
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import "filepond/dist/filepond.min.css"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import { useAppDispatch } from "../hooks/utilityHooks"
import { usersAsyncThunk } from "../redux/asyncThunk/user.asyns"
import { objectToFormData } from "../utils/formDataConvert"
import { updateProfileReducer } from "../redux/slices/auth.slice"
registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview)
const UserProfileCard: React.FC<any> = ({ user }) => {
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
  console.log(files)
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white border border-gray-200 dark:border-gray-700 dark:bg-slate-900 shadow-2xl dark:shadow-inner rounded-lg overflow-hidden max-w-sm ">
        <div className="w-full flex justify-center">
          <img
            loading="lazy"
            src={user?.avatar?.url}
            alt="User Avatar"
            className="w-28 h-28 my-1 object-fill object-center rounded-full justify-center "
          />
        </div>

        <div className="h-12 relative overflow-hidden">
          {/* Custom file upload button */}
          <button
            disabled={files ? true : false}
            className={`${files ? "disabled:bg-slate-400 cursor-not-allowed" : "bg-blue-500"} sm:mx-20 sm:mt-2 text-white text-xs font-medium py-2 px-4 rounded absolute top-0 left-0 cursor-pointer`}
          >
            {files ? "Uploading..." : "Edit Avatar"}
          </button>

          {/* Actual file input element */}
          <input
            disabled={files ? true : false}
            type="file"
            className={`opacity-0 absolute top-0 left-0 w- h-full ${files ? "cursor-not-allowed" : "cursor-pointer"}`}
            onChange={(e) => handleFile(e)}
          />
        </div>
        <div className="px-4 mt">
          <div className="flex w-full justify-center flex-col text-center ">
            <h2 className="text-xl dark:text-white font-semibold mb-2">
              {user?.name}
            </h2>

            <span className=" text-black text-xs dark:text-slate-300 mt-[-10px] underline">
              {user?.role}
            </span>
          </div>
          <p className="text-gray-600 mb-2 dark:text-slate-300">
            Email: {user?.email}
          </p>
          <p className="text-gray-600 mb-4 dark:text-slate-300">
            Gender: {user?.gender}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCard

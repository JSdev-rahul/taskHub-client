import React, { memo } from "react"
import { iAvatarUploadProps } from "../utils/componentProps"

const AvatarUpload: React.FC<iAvatarUploadProps> = ({
  userAvatar,
  handleFile,
  files,
}) => {
  return (
    <div>
      <div className="w-full flex justify-center">
        <img
          loading="lazy"
          src={userAvatar?.url}
          alt="User Avatar"
          className="w-28 h-28 my-1 object-fill object-center rounded-full justify-center"
        />
      </div>
      <div className="h-12 relative overflow-hidden">
        {/* Custom file upload button */}
        <button
          disabled={files ? true : false}
          className={`${
            files ? "disabled:bg-slate-400 cursor-not-allowed" : "bg-blue-500"
          } sm:mx-20 sm:mt-2 text-white text-xs font-medium py-2 px-4 rounded absolute top-0 left-0 cursor-pointer`}
        >
          {files ? "Uploading..." : "Edit Avatar"}
        </button>

        {/* Actual file input element */}
        <input
          disabled={files ? true : false}
          type="file"
          className={`opacity-0 absolute top-0 left-0 w- h-full ${
            files ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onChange={(e) => handleFile(e)}
        />
      </div>
    </div>
  )
}

export default memo(AvatarUpload)

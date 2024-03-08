import React, { memo } from "react"
import { iAvatarUploadProps } from "../utils/componentProps"

const AvatarUpload: React.FC<iAvatarUploadProps> = ({
  userAvatar,
  handleFile,
  files,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex justify-center my-4">
        <img
          loading="lazy"
          src={userAvatar?.url}
          alt="User Avatar"
          className="w-32 h-32 object-fill object-center rounded-full"
        />
      </div>
      <div className="relative overflow-hidden contents">
        {/* Custom file upload button */}
        <button
          disabled={files ? true : false}
          className={`${
            files
              ? "disabled:bg-slate-400 cursor-not-allowed"
              : "bg-blue-500 mb-1"
          } text-white text-xs font-medium py-2 px-4 rounded cursor-pointer`}
        >
          {files ? "Uploading..." : "Edit Avatar"}
        </button>

        {/* Actual file input element */}
        <input
          disabled={files ? true : false}
          type="file"
          className={`opacity-0 absolute inset-0 w-full h-full ${
            files ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onChange={(e) => handleFile(e)}
        />
      </div>
    </div>
  )
}

export default memo(AvatarUpload)

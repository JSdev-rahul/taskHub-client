import React from "react"

const UserProfileCard: React.FC<any> = ({ user }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm ">
        <div className="w-full flex justify-center">
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-48 h-48 object-fill object-center rounded-full justify-center "
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{user?.name}</h2>
          <p className="text-gray-600 mb-2">Email: {user?.email}</p>
          <p className="text-gray-600 mb-4">Gender: {user?.gender}</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCard

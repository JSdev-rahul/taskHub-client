import React, { useState } from "react"
import { handleLogoutReducer } from "../redux/slices/auth.slice"
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks"
import { dummyProfile, logoutSvgIcon, moonSvgIcon, sunSvgIcon } from "../assets"
import { routingConfig } from "../routes/routes"
import { useNavigate } from "react-router-dom"
import { toggleDarkMode } from "../redux/slices/uimode.slice"

const Header = () => {
  const { darkMode } = useAppSelector((state) => state.uimode)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState: any) => !prevState)
  }
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  return (
    <header className="fixed top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-blue-600 text-sm py-3 sm:py-0 dark:bg-black">
      <nav
        className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex justify-between w-full items-center">
          <div className="flex  md:justify-between items-center">
            <div>
              <button
                onClick={() => navigate(routingConfig.home)}
                className="flex-none text-xl font-semibold text-white"
                aria-label="Brand"
              >
                TaskHub
              </button>
            </div>

            <div>
              <img
                onClick={() => dispatch(toggleDarkMode())}
                className="w-7 ml-2 cursor-pointer"
                src={darkMode ? sunSvgIcon : moonSvgIcon}
              />
            </div>
          </div>

          <div
          // id="navbar-collapse-with-animation"
          // className=" transition-all duration-300 basis-full grow sm:block"
          >
            {/* <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7"> */}
            <div className="flex gap-4 justify-center   ">
              <div
                className="font-medium text-white sm:py-6 cursor-pointer"
                onClick={() => navigate(routingConfig.profile)}
                aria-current="page"
              >
                Profile
              </div>
              <div className="sm:hidden">
                <a
                  onClick={() => dispatch(handleLogoutReducer())}
                  className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
                  href="#"
                >
                  LogOut
                </a>
              </div>

              <div className="hidden sm:flex flex-row gap-2 justify-center items-center">
                <div>
                  <img
                    src={`http://localhost:8080/${user?.avtar
                      .split("\\")
                      .pop()}`}
                    alt="User Avatar"
                    className="w-10 h-10 object-fill object-center rounded-full justify-center "
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <span className="font-medium text-white/[.8] hover:text-white">
                    {user?.name}
                  </span>
                  <span className="flex justify-center text-xs font-medium text-white/[.8]">
                    {user?.role}
                  </span>
                </div>

                <a
                  onClick={() => dispatch(handleLogoutReducer())}
                  className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
                  href="#"
                >
                  LogOut
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

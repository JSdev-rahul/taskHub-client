import { moonSvgIcon, sunSvgIcon } from "../assets"
import { useAppDispatch, useAppSelector } from "../hooks/utilityHooks"
import { useNavigate } from "react-router-dom"
import { handleLogoutReducer } from "../redux/slices/auth.slice"
import { toggleDarkMode } from "../redux/slices/uimode.slice"
import { Roles, adminMenuItem, usersMenuItem } from "../utils/constants"
import { routingConfig } from "../routes/routes"
import SVGImage from "./SvgRender"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { darkMode } = useAppSelector((state) => state.uimode)
  const { user } = useAppSelector((state) => state.auth)

  const menuItems = user?.role === Roles.ADMIN ? adminMenuItem : usersMenuItem

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

            <div
              className="w-7 ml-2 cursor-pointer"
              onClick={() => dispatch(toggleDarkMode())}
            >
              <SVGImage
                src={darkMode ? sunSvgIcon : moonSvgIcon}
                title="uimode"
              />
            </div>
          </div>

          <div>
            <div className="flex gap-4 justify-center">
              {menuItems?.map((item) => {
                return (
                  <div
                    className="font-medium text-white sm:py-6 cursor-pointer"
                    onClick={() => navigate(item?.route)}
                    aria-current="page"
                  >
                    {item?.pageName}
                  </div>
                )
              })}

              <div className="sm:hidden">
                <button
                  onClick={() => dispatch(handleLogoutReducer())}
                  className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
                >
                  LogOut
                </button>
              </div>

              <div className="hidden sm:flex flex-row gap-2 justify-center items-center">
                <div>
                  <img
                    loading="lazy"
                    src={user?.avatar?.url}
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

                <button
                  onClick={() => dispatch(handleLogoutReducer())}
                  className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
                >
                  LogOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

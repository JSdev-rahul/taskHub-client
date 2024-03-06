import { useState } from "react"
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu"
import "@szhsin/react-menu/dist/index.css"
import { iDropDownMenuProps } from "../utils/componentProps"
import { useAppSelector } from "../hooks/utilityHooks"

const DropdownMenu: React.FC<iDropDownMenuProps> = ({
  title,
  setPageData,
  pageData,
  option,
}) => {
  const { darkMode } = useAppSelector((state) => state.uimode)
  return (
    <Menu
      menuStyle={{
        // width: "50px",
        color: darkMode ? "white" : "black",
        backgroundColor: darkMode ? "rgb(15 23 42)" : "white",
        border: darkMode ? "1px solid gray-700" : "none",
        // boxShadow: darkMode ? "0 2px 4px rgba(0, 0, 0, 0.2)" : "none",

        // Change background color based on dark mode
      }}
      direction="bottom"
      position="auto"
      align="center"
      // theming={darkMode ? "dark" : "light"} // Change theme based on dark mode
      onItemClick={(e) =>
        setPageData({ ...pageData, filter: e.value == "all" ? "" : e.value })
      }
      menuButton={<MenuButton>{title}</MenuButton>}
    >
      {option?.map((item: any) => {
        return (
          <MenuItem
            className="text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
            value={item?.value}
          >
            {item?.value}
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default DropdownMenu

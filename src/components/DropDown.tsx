import { useState } from "react"
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu"
import "@szhsin/react-menu/dist/index.css"
import { iDropDownMenuProps } from "../utils/componentProps"

const DropdownMenu: React.FC<iDropDownMenuProps> = ({
  title,
  setPageData,
  pageData,
  option,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <Menu
      menuStyle={{
        width: "50px",
        backgroundColor: isDarkMode ? "#333" : "white", // Change background color based on dark mode
      }}
      direction="bottom"
      position="auto"
      align="center"
      theming={isDarkMode ? "dark" : "light"} // Change theme based on dark mode
      onItemClick={(e) =>
        setPageData({ ...pageData, filter: e.value == "all" ? "" : e.value })
      }
      menuButton={<MenuButton>{title}</MenuButton>}
    >
      {option?.map((item: any) => {
        return (
          <MenuItem
            value={item?.value}
            className={isDarkMode ? "szh-menu-container--theme-dark" : ""}
          >
            {item?.value}
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default DropdownMenu

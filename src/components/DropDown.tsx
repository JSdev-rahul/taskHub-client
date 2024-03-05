import { useState } from "react"
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu"
import "@szhsin/react-menu/dist/index.css"

interface DropdownMenuProps {
  title?: string
  option?: string[]
  setPageData?: any
  pageData?: any
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  setPageData,
  pageData,
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
      <MenuItem
        value={"all"}
        className={isDarkMode ? "szh-menu-container--theme-dark" : ""}
      >
        all
      </MenuItem>
      <MenuItem
        value={"user"}
        className={isDarkMode ? "szh-menu-container--theme-dark" : ""}
      >
        user
      </MenuItem>
      <MenuItem
        value={"admin"}
        className={isDarkMode ? "szh-menu-container--theme-dark" : ""}
      >
        admin
      </MenuItem>
    </Menu>
  )
}

export default DropdownMenu

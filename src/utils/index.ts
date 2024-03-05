import { routingConfig } from "../routes/routes"

interface MenuItem {
  pageName: string
  route: string // Make route required, since it's always provided
}

// Define page names as an enum for better type safety and consistency
export enum Roles {
  ADMIN = "admin",
  USER = "user",
}

enum PageName {
  PROFILE = "profile",
  USERS = "users",
}

// Define menu items for users and admin separately
export const usersMenuItem: MenuItem[] = [
  { pageName: PageName.PROFILE, route: routingConfig.profile },
]

export const adminMenuItem: MenuItem[] = [
  { pageName: PageName.USERS, route: routingConfig.users },
  { pageName: PageName.PROFILE, route: routingConfig.profile },
]

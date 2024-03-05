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

enum PRIORITY_LEVEl {
  ALL = "All",
  LOW = "Low",
  MEDINUm = "Medium",
  HIGH = "High",
}
export const PRIORITIES: { id: number; priority: string }[] = [
  { id: 1, priority: PRIORITY_LEVEl.LOW },
  { id: 2, priority: PRIORITY_LEVEl.MEDINUm },
  { id: 3, priority: PRIORITY_LEVEl.HIGH },
]

export const FILTER_PRIORITY: { id: number; priority: string }[] = [
  { id: 1, priority: PRIORITY_LEVEl.ALL },
  ...PRIORITIES,
]

enum TabsName {
  PENDING = "Pending",
  COMPLETED = "Completed",
}

export const TABS: { label: string; value: TabsName }[] = [
  { label: TabsName.PENDING, value: TabsName.PENDING },
  { label: TabsName.COMPLETED, value: TabsName.COMPLETED },
]

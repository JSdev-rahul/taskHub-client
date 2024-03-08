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
  MEDINUM = "Medium",
  HIGH = "High",
}

export interface iPriority {
  lable: string
  value: string
}

export const PRIORITIES: iPriority[] = [
  { lable: PRIORITY_LEVEl.LOW, value: PRIORITY_LEVEl.LOW },
  { lable: PRIORITY_LEVEl.MEDINUM, value: PRIORITY_LEVEl.MEDINUM },
  { lable: PRIORITY_LEVEl.HIGH, value: PRIORITY_LEVEl.HIGH },
]

export const FILTER_PRIORITY: iPriority[] = [
  { lable: PRIORITY_LEVEl.ALL, value: PRIORITY_LEVEl.ALL },
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

enum ROLES {
  USER = "user",
  ADMIN = "admin",
}

export const AUTH_ROLE: iPriority[] = [
  { lable: ROLES.USER, value: ROLES.USER },
  { lable: ROLES.ADMIN, value: ROLES.ADMIN },
]

enum TableColumn {
  NAME = "Name",
  ROLE = "Role",
  GENDER = "Gender",
  STATUS = "Status",
  CREATED = "Created",
  ACTION = "Action",
}

export interface TableColumnInfo {
  name: TableColumn
  label: string
}

export const UserTableColumns: TableColumnInfo[] = [
  { name: TableColumn.NAME, label: "Full Name" },
  { name: TableColumn.ROLE, label: "Role" },
  { name: TableColumn.GENDER, label: "Gender" },
  { name: TableColumn.STATUS, label: "Status" },
  { name: TableColumn.CREATED, label: "Date Created" },
  { name: TableColumn.ACTION, label: "Actions" },
]

enum UserTableFilter {
  ALL = "all",
  USER = "user",
  ADMIN = "admin",
}
interface iUserTableFilterOptions {
  label: string
  value: string
}
export const userTableFilterOptions: iUserTableFilterOptions[] = [
  { label: UserTableFilter.ALL, value: UserTableFilter.ALL },
  { label: UserTableFilter.USER, value: UserTableFilter.USER },
  { label: UserTableFilter.ADMIN, value: UserTableFilter.ADMIN },
]

interface SelectOption {
  value: number
  label: string
}

// Select options constant
export const selectRowOptions: SelectOption[] = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 25, label: "25" },
]

export enum RequestStatus {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

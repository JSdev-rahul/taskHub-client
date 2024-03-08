export interface iToDoFormProps {
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>
  editToDoItems: string | null
  setEditTodoItems: any
  getAllUserTodoshandler: () => void
}

export interface iTodoFormData {
  title?: string
  description?: string
  priority?: "Low" | "Medium" | "High"
  completed: boolean
  dueDateTime?: Date
  id?: string
  _id?: string
}

export interface iToDoPageData {
  page: number
  limit: number
  q: string
  priority: string
  completed: boolean
  id: string
}

export interface iSignInForm {
  email: string
  password: string
}

export interface iUserPaginationQuery {
  page: number
  limit: number
  q: string
  filter: string | null
}

export interface iSignUpForm {
  name: string
  gender: string
  email: string
  password: string
  avatar: string
  role: string
  createdBy: string | undefined
}

export interface iChangePasswordForm {
  email: string
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface iForgotPasswordForm {
  email: string
  newPassword: string
  confirmPassword: string
}

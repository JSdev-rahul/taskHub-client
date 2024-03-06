import { iToDoPageData } from "./interfaces"

export interface iCheckBoxProps {
  id: string
  name: string
  label: string
  type: string
  value: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: string | null | undefined
}

export interface iDropDownMenuProps {
  title?: string
  option?: any
  setPageData?: any
  pageData?: any
}

export interface iInputFieldProps {
  id: string
  name: string
  type: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  error: any
}

export interface iModelComponentProps {
  children: JSX.Element
  isModelOpen: boolean
  closeModel: () => void
  ModelTitle: string
}

export interface iOtpComponentProps {
  otp: string
  time: number
  timer: any
  setTime: React.Dispatch<any>
  setOtp: React.Dispatch<string>
  handleRegenerateOTP: () => void
  handleOtpVerification: () => void
  setIsOtpPage: React.Dispatch<boolean>
}

interface iOptions {
  lable: string
  value: string
}

export interface iSelectComponentProps {
  id: string
  name: string
  title: string
  value: string
  options: iOptions[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
}

export interface iTabsProps {
  tabs: { label: string; value: string }[]
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
  pageData: iToDoPageData
  setPageData: React.Dispatch<React.SetStateAction<iToDoPageData>>
}

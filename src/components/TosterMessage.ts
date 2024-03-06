import { Toaster } from "../utils/SweetAlert"

export const ToastMessage = (icon: any, title: string, text: string) => {
  Toaster.fire({
    icon,
    title,
    text,
  })
}

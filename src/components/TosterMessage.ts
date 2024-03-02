import { Toaster } from "../utils/SweetAlert";



export const ToastMessage = (icon:any, title:any, text:string) => {
    Toaster.fire({
      icon,
      title,
      text,
    });
  };
import { Bounce, ToastOptions, toast } from "react-toastify";

let toastProps:ToastOptions = {
  position: "top-right",
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  transition: Bounce,
  autoClose: 1000,
};

export const dangerToast = (message :string) => {
  return toast(message, {
    ...toastProps,
    type: "error",
  });
};
export const infoToast = (message :string) => {
  return toast(message, {
    ...toastProps,
    type: "info",
  });
};

export const successToast = (message :string) => {
  return toast(message, {
    ...toastProps,
    type: "success",
  });
};

export const warningToast = (message :string) => {
  return toast(message, {
    ...toastProps,
    type: "warning",
  });
};

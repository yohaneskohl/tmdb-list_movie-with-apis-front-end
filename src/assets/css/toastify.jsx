import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Konfigurasi default toast
export const showToast = (message, type = "info") => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};

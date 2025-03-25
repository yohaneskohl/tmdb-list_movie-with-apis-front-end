import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CookieStorage, CookieKeys } from "../utils/Cookies";
import { showToast } from "../assets/css/toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      CookieStorage.set(CookieKeys.AuthToken, token, { expiresInHours: 12 }); 
      showToast("Login dengan Google berhasil!", "success");
      navigate("/");
    } else {
      showToast("Gagal mendapatkan token dari Google", "error");
      navigate("/login");
    }
  }, [token, navigate]);

  return <div>Memproses login...</div>;
};

export default GoogleCallback;

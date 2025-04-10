import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/reducer/auth/authReducer";
import { CookieStorage, CookieKeys } from "../utils/Cookies";
import { jwtDecode } from "jwt-decode";
import { getExpirationDate } from "../utils/expirationUtils";
import { apiClient } from "../utils/apiClient";
import { showToast } from "../assets/css/toastify";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        // Decode token untuk mengambil data user
        const decodedUser = jwtDecode(token);
        console.log("👤 Decoded user:", decodedUser);

        // Simpan ke cookies & redux
        CookieStorage.set(CookieKeys.AuthToken, token, {
          expires: getExpirationDate(12),
        });
        CookieStorage.set(CookieKeys.User, decodedUser, {
          expires: getExpirationDate(12),
        });

        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(setToken(token));
        dispatch(setUser(decodedUser));

        showToast("Login Google berhasil", "success");
        window.dispatchEvent(new Event("authChange"));
      } catch (err) {
        console.error("❌ Gagal decode token:", err);
        showToast("Token tidak valid", "error");
      }
    }

    navigate("/"); // Arahkan kembali ke halaman utama setelah login
  }, [dispatch, navigate, searchParams]);

  return <p className="text-center mt-10">Logging in with Google...</p>;
};

export default GoogleCallback;

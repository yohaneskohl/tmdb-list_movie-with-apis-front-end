// redux/actions/authActions.js
import { reduxLoginUser } from "../../services/auth/login_user";
import { reduxRegisterUser } from "../../services/auth/register_user";
import { reduxUpdateUserProfile } from "../../services/auth/update_profile";
import { setLoading, setToken, setUser } from "../reducer/auth/authReducer";
import { CookieStorage, CookieKeys } from "../../utils/Cookies";
import { getExpirationDate } from "../../utils/expirationUtils";
import { apiClient } from "../../utils/apiClient";
import { showToast } from "../../assets/css/toastify";
import { reduxGetUserProfile } from "../../services/auth/get_profile";

export const loginUserAction = (input) => async (dispatch) => {
  try {
    const response = await reduxLoginUser(input);
    const { token, user } = response.data.data;

    CookieStorage.set(CookieKeys.AuthToken, token, {
      expires: getExpirationDate(12),
    });
    CookieStorage.set(CookieKeys.User, user, {
      expires: getExpirationDate(12),
    });

    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch(setToken(token));
    dispatch(setUser(user));

    showToast("Login berhasil", "success");
    window.dispatchEvent(new Event("authChange"));
  } catch (error) {
    console.error("Login error:", error.response?.data || error);
    showToast(error.response?.data?.message || "Login gagal", "error");
  }
};

export const registerUserAction = (input) => async () => {
  try {
    const response = await reduxRegisterUser(input);

    if (response.data.status) {
      showToast("Register berhasil. Silakan login.", "success");
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Register error:", error.response?.data || error);
    showToast(error.response?.data?.message || "Register gagal", "error");
  }
};

// Action untuk login dengan Google
export const loginWithGoogleAction = () => {
  return (dispatch) => {
    const googleLoginUrl = `${process.env.REACT_APP_BASE_BACKEND_URL}/auth/google/callback`;
    window.location.href = googleLoginUrl; // Redirect ke URL login Google
  };
};


export const updateUserProfileAction = (input) => async (dispatch) => {
  try {
    const response = await reduxUpdateUserProfile(input);
    const { user } = response.data.data;

    // Simpan user baru di cookie dan Redux
    CookieStorage.set(CookieKeys.User, user, {
      expires: getExpirationDate(12),
    });
    dispatch(setUser(user));

    showToast("Update profile berhasil", "success");
  } catch (error) {
    console.error("Update profile error:", error.response?.data || error);
    showToast(error.response?.data?.message || "Update profile gagal", "error");
    throw error; // lempar ke komponen (agar bisa ditangkap di try-catch)
  }
};

export const syncAuthFromCookies = () => (dispatch) => {
  const token = CookieStorage.get(CookieKeys.AuthToken);
  const user = CookieStorage.get(CookieKeys.User);

  if (token && user) {
    dispatch(setToken(token));
    dispatch(setUser(user));
  }
};

export const getUserProfileAction = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await reduxGetUserProfile();
    console.log("✅ API response:", response);

    const user = response.data.data; // ✅ langsung objek user

    console.log("Parsed user:", user);
  
    
    CookieStorage.set(CookieKeys.User, user, {
      expires: getExpirationDate(12),
    });

    dispatch(setUser(user));
  } catch (error) {
    console.error("❌ Get profile error:", error?.response?.data || error);
    dispatch(setLoading(false));
  }
};

export const logoutAction = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  CookieStorage.remove(CookieKeys.AuthToken);
  CookieStorage.remove(CookieKeys.User);
  delete apiClient.defaults.headers.common["Authorization"];
  window.dispatchEvent(new Event("authChange"));
  showToast("Logout berhasil", "info");
};

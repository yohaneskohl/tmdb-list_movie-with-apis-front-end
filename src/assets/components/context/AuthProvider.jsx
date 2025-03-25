import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import { apiClient, authClient } from "../../../utils/apiClient";
import { GET_DATA_AUTH } from "../../../services/auth/get-data-auth";
import { showToast } from "../../css/toastify";
import { CookieStorage, CookieKeys } from "../../../utils/Cookies";
import { getExpirationDate } from "../../../utils/expirationUtils";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => CookieStorage.get(CookieKeys.User) || null);
  const [token, setToken] = useState(() => CookieStorage.get(CookieKeys.AuthToken) || null);
  const [loading, setLoading] = useState(true);
  const hasFetchedProfile = useRef(false);

  // Fetch Profile
  const fetchProfile = useCallback(async () => {
    if (!token || hasFetchedProfile.current) return;

    try {
      hasFetchedProfile.current = true;
      const response = await apiClient.get(GET_DATA_AUTH.PROFILE);
      setUser(response.data.data);
      CookieStorage.set(CookieKeys.User, response.data.data, { expires: getExpirationDate(12) });
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error);
      showToast("Failed to fetch profile", "error");
    }
  }, [token]);

  // Cek autentikasi saat aplikasi pertama kali dibuka
  const checkAuth = useCallback(async () => {
    const savedToken = CookieStorage.get(CookieKeys.AuthToken);
    if (!savedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    setToken(savedToken);
    await fetchProfile();
    setLoading(false);
  }, [fetchProfile]);

  useEffect(() => {
    checkAuth();

    // Tambahkan event listener untuk perubahan autentikasi
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, [checkAuth]);

  // Login
  const login = async (email, password) => {
    try {
      const response = await authClient.post(GET_DATA_AUTH.LOGIN, { email, password });
      const { token } = response.data.data;

      setToken(token);
      CookieStorage.set(CookieKeys.AuthToken, token, { expires: getExpirationDate(12) });

      hasFetchedProfile.current = false;
      await fetchProfile();
      showToast("Login successful!", "success");

      // Memicu event agar navbar terupdate
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      showToast(error.response?.data?.message || "Login failed", "error");
    }
  };

  // Login dengan Google (dipanggil setelah redirect)
  const handleGoogleAuth = useCallback(async () => {
    await checkAuth();
    window.dispatchEvent(new Event("authChange"));
  }, [checkAuth]);

  useEffect(() => {
    handleGoogleAuth();
  }, [handleGoogleAuth]);

  // Register
  const register = async (name, email, password) => {
    try {
      const response = await authClient.post(GET_DATA_AUTH.REGISTER, { name, email, password });

      if (response.data.status) {
        showToast("Registration successful! Please login.", "success");
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Register error:", error.response?.data || error);
      showToast(error.response?.data?.message || "Registration failed!", "error");
      throw new Error(error.response?.data?.message || "Registration failed!");
    }
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    try {
      const response = await apiClient.put("/profile", profileData);
      showToast("Profile updated successfully!", "success");

      setUser(response.data.data);
      CookieStorage.set(CookieKeys.User, response.data.data, { expires: getExpirationDate(12) });

      return response.data.data;
    } catch (error) {
      console.error("Update profile error:", error.response?.data || error);
      showToast(error.response?.data?.message || "Failed to update profile!", "error");
      throw error;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    CookieStorage.remove(CookieKeys.AuthToken);
    CookieStorage.remove(CookieKeys.User);
    apiClient.defaults.headers.common["Authorization"] = "";
    hasFetchedProfile.current = false;

    window.dispatchEvent(new Event("authChange"));
    showToast("Logged out successfully", "info");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, fetchProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

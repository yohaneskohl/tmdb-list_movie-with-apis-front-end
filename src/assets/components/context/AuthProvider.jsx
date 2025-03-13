import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import { apiClient, authClient } from "../../../utils/apiClient";
import { GET_DATA_AUTH } from "../../../services/auth/get-data-auth";
import { showToast } from "../../css/toastify";
import { CookieStorage, CookieKeys } from "../../../utils/Cookies";
import { getExpirationDate } from "../../../utils/expirationUtils"; // ✅ Pisahkan expiration

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => CookieStorage.get(CookieKeys.User) || null);
  const [token, setToken] = useState(() => CookieStorage.get(CookieKeys.AuthToken) || null);
  const [loading, setLoading] = useState(true);
  const hasFetchedProfile = useRef(false);

  // Fetch Profile
  const fetchProfile = useCallback(async () => {
    if (!token || hasFetchedProfile.current) return;

    console.log("Fetching profile with token:", token);

    try {
      hasFetchedProfile.current = true;
      const response = await apiClient.get(GET_DATA_AUTH.PROFILE);
      console.log("Profile data:", response.data.data);
      setUser(response.data.data);
      CookieStorage.set(CookieKeys.User, response.data.data, { expires: getExpirationDate(12) }); // ✅ 12 jam
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error);
      showToast("Failed to fetch profile", "error");
    }
  }, [token]);

  // Cek autentikasi saat aplikasi pertama kali dibuka
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await fetchProfile();
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, fetchProfile]);

  // Login
  const login = async (email, password) => {
    try {
      const response = await authClient.post(GET_DATA_AUTH.LOGIN, { email, password });
      const { token } = response.data.data;

      console.log("Token received:", token);

      setToken(token);
      CookieStorage.set(CookieKeys.AuthToken, token, { expires: getExpirationDate(12) }); // ✅ Expire 12 jam

      hasFetchedProfile.current = false;
      await fetchProfile();
      showToast("Login successful!", "success");
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      showToast(error.response?.data?.message || "Login failed", "error");
    }
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    try {
      const response = await apiClient.put("/profile", profileData);
      showToast("Profile updated successfully!", "success");

      // Update user data di state dan cookies
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
    apiClient.defaults.headers.common["Authorization"] = ""; // ✅ Hapus token dari interceptor
    hasFetchedProfile.current = false;
    window.dispatchEvent(new Event("authChange"));
    showToast("Logged out successfully", "info");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, fetchProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

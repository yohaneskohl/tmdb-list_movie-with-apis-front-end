import React, { createContext, useState, useEffect, useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { apiClient, authClient } from "../../../utils/apiClient";
import { authKeys } from "../../../services/auth/auth.keys";
import { authParams } from "../../../services/auth/auth.params";
import { showToast } from "../../css/toastify";
import { CookieStorage, CookieKeys } from "../../../utils/Cookies";
import { getExpirationDate } from "../../../utils/expirationUtils";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => CookieStorage.get(CookieKeys.User) || null);
  const [token, setToken] = useState(() => CookieStorage.get(CookieKeys.AuthToken) || null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile dengan _key dan _params
  const fetchProfile = useCallback(async () => {
    if (!token) return;

    const _key = authKeys.profile;
    const _params = authParams.profile();

    try {
      const { data } = await apiClient.get(_key, { params: _params });

      setUser(data.data);
      CookieStorage.set(CookieKeys.User, data.data, { expires: getExpirationDate(12) });
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error);
      showToast("Failed to fetch profile", "error");
    }
  }, [token]);

  // ✅ Check token on app load
  const checkAuth = useCallback(async () => {
    const savedToken = CookieStorage.get(CookieKeys.AuthToken);
    if (!savedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    setToken(savedToken);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

    await fetchProfile();
    setLoading(false);
  }, [fetchProfile]);

  useEffect(() => {
    checkAuth();

    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, [checkAuth]);

  // ✅ Login dengan email & password
  const login = async (email, password) => {
    try {
      const _key = authKeys.login;
      const response = await authClient.post(_key, { email, password });
      const { token } = response.data.data;

      setToken(token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      CookieStorage.set(CookieKeys.AuthToken, token, { expires: getExpirationDate(12) });

      await fetchProfile();
      showToast("Login successful!", "success");
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      showToast(error.response?.data?.message || "Login failed", "error");
    }
  };

  // ✅ Login Google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const googleToken = response.access_token;
        const _key = authKeys.googleAuth;

        const res = await authClient.post(_key, { token: googleToken });
        const { token } = res.data.data;

        setToken(token);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        CookieStorage.set(CookieKeys.AuthToken, token, { expires: getExpirationDate(12) });

        await fetchProfile();
        showToast("Login dengan Google berhasil!", "success");
        window.dispatchEvent(new Event("authChange"));
      } catch (error) {
        console.error("Google Login Error:", error.response?.data || error);
        showToast(error.response?.data?.message || "Login dengan Google gagal", "error");
      }
    },
    onError: () => {
      showToast("Login dengan Google gagal", "error");
    },
  });

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      const _key = authKeys.register;
      const response = await authClient.post(_key, { name, email, password });

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

  // ✅ Update Profile
  const updateProfile = async (profileData) => {
    try {
      const _key = authKeys.profile;
      const response = await apiClient.put(_key, profileData);

      setUser(response.data.data);
      CookieStorage.set(CookieKeys.User, response.data.data, { expires: getExpirationDate(12) });
      showToast("Profile updated successfully!", "success");
      return response.data.data;
    } catch (error) {
      console.error("Update profile error:", error.response?.data || error);
      showToast(error.response?.data?.message || "Failed to update profile!", "error");
      throw error;
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    CookieStorage.remove(CookieKeys.AuthToken);
    CookieStorage.remove(CookieKeys.User);
    apiClient.defaults.headers.common["Authorization"] = "";

    window.dispatchEvent(new Event("authChange"));
    showToast("Logged out successfully", "info");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        handleGoogleLogin,
        register,
        logout,
        loading,
        fetchProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import { apiClient, authClient } from "../../../utils/apiClient";
import { GET_DATA_AUTH } from "../../../services/auth/get-data-auth";
import { showToast } from "../../css/toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const hasFetchedProfile = useRef(false);

  // Fetch Profile
  const fetchProfile = useCallback(async () => {
    if (!token || hasFetchedProfile.current) return;

    try {
      hasFetchedProfile.current = true;
      const response = await apiClient.get(GET_DATA_AUTH.PROFILE);
      setUser(response.data.data);
    } catch (error) {
      showToast("Failed to fetch profile", "error");
      console.error("Error fetching profile:", error);
    }
  }, [token]);


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

  // Login (Menggunakan authClient)
  const login = async (email, password) => {
    try {
      const response = await authClient.post(GET_DATA_AUTH.LOGIN, { email, password });
      const { token } = response.data.data;

      setToken(token);
      localStorage.setItem("token", token);
      hasFetchedProfile.current = false;
      await fetchProfile();

      showToast("Login successful!", "success");
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      showToast(error.response?.data?.message || "Login failed", "error");
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await apiClient.put("/profile", profileData); // ✅ Sesuaikan endpoint
      showToast("Profile updated successfully!", "success");
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
    localStorage.removeItem("token");
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

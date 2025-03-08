import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_AUTH = process.env.REACT_APP_BASE_AUTH;
const BASE_BACKEND_URL = process.env.REACT_APP_BASE_BACKEND_URL;

// Deklarasi Context dengan nama yang benar
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil profil user dari API
  const fetchProfile = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${BASE_BACKEND_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.data); // Simpan data user ke state
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  }, [token]);

  // Fungsi untuk memperbarui profil user
  const updateProfile = async (updatedData) => {
    if (!token) return;

    try {
      console.log("Mengirim data update ke backend:", updatedData);
      console.log("Token yang digunakan:", token);

      const response = await axios.put(`${BASE_BACKEND_URL}/profile`, updatedData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      console.log("Profil berhasil diperbarui:", response.data);
      setUser(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Gagal update profile:", error.response?.data || error);
      throw new Error(error.response?.data?.message || "Update failed");
    }
  };

  // Cek autentikasi saat aplikasi dijalankan
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_AUTH}/authenticate`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.data);
        await fetchProfile(); // Ambil profil setelah autentikasi sukses
      } catch (error) {
        logout(); // Logout jika token tidak valid
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, fetchProfile]);

  // Fungsi Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_AUTH}/login`, { email, password });
      const { token, user } = response.data.data;

      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);

      await fetchProfile(); // Ambil profil setelah login
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // Fungsi Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, fetchProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

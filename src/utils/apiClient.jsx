import axios from "axios";
import { CookieStorage, CookieKeys } from "./Cookies";

const BASE_BACKEND_URL = process.env.REACT_APP_BASE_BACKEND_URL;
const BASE_AUTH_URL = process.env.REACT_APP_BASE_AUTH;

// Instance untuk API utama (data user, update profil, dsb.)
export const apiClient = axios.create({
  baseURL: BASE_BACKEND_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

// Instance khusus untuk autentikasi (login, register, dsb.)
export const authClient = axios.create({
  baseURL: BASE_AUTH_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

// Interceptor untuk menambahkan token ke `apiClient`
apiClient.interceptors.request.use((config) => {
  const token = CookieStorage.get(CookieKeys.AuthToken);
  console.log("Interceptor - Token:", token); // ✅ Debug token sebelum request
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

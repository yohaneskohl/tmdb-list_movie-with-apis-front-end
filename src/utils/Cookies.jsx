import Cookies from "universal-cookie";
import { getExpirationDate } from "./expirationUtils"; // ✅ Import fungsi expiration

const cookies = new Cookies();

export const CookieKeys = {
  AuthToken: "authToken",
  User: "user",
};

const CookieOptions = {
  path: "/",
  secure: true,
  sameSite: "Strict",
};

export const CookieStorage = {
  set: (key, data, options = {}) => {
    const expires = getExpirationDate(options.expiresInHours || 24); // ✅ Default 24 jam
    return cookies.set(key, data, { ...CookieOptions, expires, ...options });
  },

  get: (key, options = {}) => {
    return cookies.get(key, { ...CookieOptions, ...options });
  },

  remove: (key, options = {}) => {
    return cookies.remove(key, { ...CookieOptions, ...options });
  },
};

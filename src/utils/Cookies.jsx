import Cookies from "universal-cookie";

// Inisialisasi cookie instance
const cookies = new Cookies();

// Kunci untuk menyimpan data di cookies
export const CookieKeys = {
  AuthToken: "authToken",
  User: "user",
  LimitError: 100,
};

// Opsi default untuk penyimpanan cookie
const CookieOptions = {
  path: "/",
  secure: true,
};

export const CookieStorage = {
  set: (key, data, options = {}) => {
    return cookies.set(key, data, { ...CookieOptions, ...options });
  },

  get: (key, options = {}) => {
    return cookies.get(key, { ...CookieOptions, ...options });
  },

  remove: (key, options = {}) => {
    return cookies.remove(key, { ...CookieOptions, ...options });
  },
};

// services/auth/oauth_google.js
import { authClient } from "../../utils/apiClient";
import { authKeys } from "./auth.keys";

// Fungsi memanggil backend yang handle Google OAuth
export const reduxLoginWithGoogle = async (googleAccessToken) => {
  const url = `${authKeys.googleAuth}?access_token=${googleAccessToken}`;
  console.log("🌐 Google login URL:", authClient.defaults.baseURL + url);
  return await authClient.get(url); // backend akan kirim token + user
};

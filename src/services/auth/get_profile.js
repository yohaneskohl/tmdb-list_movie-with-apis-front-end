// services/auth/get_profile.js
import { apiClient } from "../../utils/apiClient";

export const reduxGetUserProfile = async () => {
  return await apiClient.get("/profile");
};

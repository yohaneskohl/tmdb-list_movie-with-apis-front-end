import { apiClient } from "../../utils/apiClient";

export const reduxUpdateUserProfile = async (data) => {
  return await apiClient.put("/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

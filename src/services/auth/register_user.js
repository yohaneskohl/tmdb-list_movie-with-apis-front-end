// services/auth/register_user.js
import { authClient } from "../../utils/apiClient";
import { API_ENDPOINT } from "../../utils/api-endpoint";

export const reduxRegisterUser = async (input) => {
  return await authClient.post(API_ENDPOINT.REGISTER_USER, input);
};

// services/auth/login_user.js
import { authClient } from "../../utils/apiClient";
import { API_ENDPOINT } from "../../utils/api-endpoint";
import { CookieStorage, CookieKeys } from "../../utils/Cookies";
import { getExpirationDate } from "../../utils/expirationUtils";
import { useMutation } from "@tanstack/react-query";
// Redux login
export const reduxLoginUser = async (input) => {
  return await authClient.post(API_ENDPOINT.LOGIN_USER, input);
};

// React Query (opsional)
const loginUser = async (input) => {
  const res = await authClient.post(API_ENDPOINT.LOGIN_USER, input);
  const { token, user } = res.data.data;

  CookieStorage.set(CookieKeys.AuthToken, token, { expires: getExpirationDate(12) });
  CookieStorage.set(CookieKeys.User, user, { expires: getExpirationDate(12) });

  return res;
};


export const useLoginUser = () => useMutation(loginUser);

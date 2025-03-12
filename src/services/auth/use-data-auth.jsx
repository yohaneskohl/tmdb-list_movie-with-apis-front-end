import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../utils/apiClient";
import { GET_DATA_AUTH } from "./get-data-auth";

const fetchUserData = async () => {
  const { data } = await apiClient.get(GET_DATA_AUTH.PROFILE);
  return data.data;
};

export const useGetUserData = (options = {}) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 30, // Cache 5 menit
    ...options,
  });
};

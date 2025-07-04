import { getAllUser } from "@/api/userApi/userApi";
import { useQuery } from "@tanstack/react-query";

export const useAllUser = () => {
  return useQuery({
    queryKey: ["all user"],
    queryFn: getAllUser,
  });
};

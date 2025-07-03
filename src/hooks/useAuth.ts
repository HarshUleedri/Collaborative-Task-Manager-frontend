import { testApi } from "@/api/authApi/authApi";
import { useQuery } from "@tanstack/react-query";

export const useTesting = () => {
  return useQuery({
    queryKey: ["testing"],
    queryFn: testApi, 
  });
};

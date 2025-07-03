import {
  getUser,
  loginApi,
  logoutApi,
  signupApi,
  testApi,
} from "@/api/authApi/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserSignupDataType } from "@/types/usertypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useTesting = () => {
  return useQuery({
    queryKey: ["testing"],
    queryFn: testApi,
  });
};

export const useSignup = () => {
  const { setIsError, setIsLoading, login } = useAuthStore((state) => state);

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: UserSignupDataType) => signupApi(data),

    onSuccess: async () => {
      try {
        setIsLoading(true);
        const res = await getUser();
        login(res.doctor);
        navigate("/", { replace: true });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as any).response === "object" &&
          (error as any).response !== null &&
          "data" in (error as any).response &&
          typeof (error as any).response.data === "object" &&
          (error as any).response.data !== null &&
          "message" in (error as any).response.data
        ) {
          setIsError((error as any).response.data.message as string);
        } else {
          setIsError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });
};

export const useLogin = () => {
  const { setIsError, setIsLoading, login } = useAuthStore((state) => state);

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) => loginApi(data),

    onSuccess: async () => {
      try {
        setIsLoading(true);
        const res = await getUser();
        login(res.doctor);
        navigate("/", { replace: true });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as any).response === "object" &&
          (error as any).response !== null &&
          "data" in (error as any).response &&
          typeof (error as any).response.data === "object" &&
          (error as any).response.data !== null &&
          "message" in (error as any).response.data
        ) {
          setIsError((error as any).response.data.message as string);
        } else {
          setIsError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore((state) => state);
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout(); // Clear user data from the store
    },
  });
};

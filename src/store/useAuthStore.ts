import type { UserData } from "@/types/usertypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStateType {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
  isError: string | null;
  login: (user: UserData) => void;
  logout: () => void;
  setUser: (user: UserData) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStateType>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      isError: null,

      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      setUser: (user) => set({ user }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsError: (error) => set({ isError: error }),
    }),
    {
      name: "auth-storage", // 🔑 key name in localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }), // only persist what you need
    }
  )
);

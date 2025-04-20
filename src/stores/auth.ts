import { persist } from "zustand/middleware";
import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string | null, refresh: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (access: string | null, refresh: string | null) =>
        set({ accessToken: access, refreshToken: refresh }),
    }),
    {
      name: "auth-storage",
    }
  )
);

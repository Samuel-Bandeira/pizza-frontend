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

type User = {
  id: number;
  email: string;
  username: string;
  role: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

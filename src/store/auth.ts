import { create } from "zustand";

type User = { name: string; phone: string; district?: string; crop?: string };

type AuthState = {
  user: User | null;
  login: (phone: string) => void;
  register: (u: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: (phone) => set({ user: { name: "Farmer", phone } }),
  register: (u) => set({ user: u }),
  logout: () => set({ user: null }),
}));

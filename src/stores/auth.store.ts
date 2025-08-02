import { create } from "zustand";

type AuthState = "login" | "register";

interface IAuthStateStore {
  authState: AuthState;
  setAuth: (state: AuthState) => void;
}

export const useAuthState = create<IAuthStateStore>(set => ({
  authState: "login",
  setAuth: state => set({ authState: state }),
}));

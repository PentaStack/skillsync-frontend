import { create } from "zustand";
import type { User } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Auth store — manages user session, JWT token, and auth state.
 *
 * Token is persisted to localStorage so sessions survive page refreshes.
 * The API client interceptor reads the token via `useAuthStore.getState()`.
 */

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  /** Set both user and token after successful login/register. */
  setAuth: (user: User, token: string) => void;

  /** Update user profile data without changing the token. */
  setUser: (user: User) => void;

  /** Clear all auth state and remove token from storage. */
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
  isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),

  setAuth: (user, token) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    set({ user, token, isAuthenticated: true });
  },

  setUser: (user) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

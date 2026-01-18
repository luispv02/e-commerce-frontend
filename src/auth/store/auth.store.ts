import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User } from "../../interfaces/user";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  authStatus: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  role: string | null;

  // actions
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        authStatus: 'checking',
        token: null,
        role: null,


        login: (user, token) => {
          set({ user, token, isAuthenticated: true, authStatus: 'authenticated', role: user.role }, false, 'auth/login');
        },

        logout: () => {
          set({ user: null, token: null, isAuthenticated: false, authStatus: 'not-authenticated', role: null }, false, 'auth/logout');
        }
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ token: state.token, user: state.user, role: state.role })
      }
    )
  )
)

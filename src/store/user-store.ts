/**
 * Zustand User Store
 *
 * Simple store for managing user state
 */

import { create } from 'zustand';
import { User } from '@/types/user';

// ============================================================================
// Types
// ============================================================================

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  actions: UserActions;
};

type UserActions = {
  setUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clearData: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  actions: {
    setUser: (user: User) => {
      set({ user });
    },
    setIsAuthenticated: (isAuthenticated: boolean) => {
      set({ isAuthenticated });
    },
    clearData: () => {
      set({ user: null, isAuthenticated: false });
    },
  },
}));

/**
 * Selector Hook - Only re-render when user changes
 */
export const useUser = () => useUserStore((state) => state.user);

/**
 * Actions - These don't cause re-renders
 */
export const useUserActions = () => useUserStore((state) => state.actions);

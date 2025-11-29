import { tokenStorage } from './token-storage';
import { useUserStore } from '@/store/user-store';

/**
 * Clear all authentication data
 * - Clears tokens from storage
 * - Clears user store
 * - Does NOT call API or redirect (caller handles that)
 */
export function clearAuth(): void {
  // Clear tokens
  tokenStorage.clearTokens();

  // Clear user store
  const { clearData, setIsAuthenticated } = useUserStore.getState().actions;
  clearData();
  setIsAuthenticated(false);
}

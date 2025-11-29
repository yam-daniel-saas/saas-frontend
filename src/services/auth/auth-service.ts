import { router } from 'expo-router';
import { useUserStore } from '@/store/user-store';
import { tokenStorage } from './token-storage';
import { SignInWithOtp, getUser } from './auth-api';
import { extractAndValidateTokens } from './token-parser';
import { clearAuth } from './auth-utils';

/**
 * Sign in with phone number and OTP
 * - Verifies OTP with backend
 * - Extracts and saves tokens
 * - Fetches user data
 * - Updates user store
 * - Redirects to protected route
 */
export async function signIn(phoneNumber: string, otp: string): Promise<void> {
  try {
    // 1. Verify OTP and get tokens from headers
    const response = await SignInWithOtp(phoneNumber, otp);
    const { accessToken, refreshToken } = extractAndValidateTokens(response.headers);

    // 2. Save tokens to storage
    tokenStorage.saveAccessToken(accessToken);
    tokenStorage.saveRefreshToken(refreshToken);

    // 3. Fetch user data
    const userResponse = await getUser();

    // 4. Update user store
    const { setUser, setIsAuthenticated } = useUserStore.getState().actions;
    setUser(userResponse.data);
    setIsAuthenticated(true);

    // 5. Navigate to protected route
    router.replace('/(app)/(protected)');
  } catch (error) {
    // Clear everything on error
    clearAuth();
    throw error;
  }
}

/**
 * Check authentication status on app start
 * - Validates stored tokens
 * - Fetches fresh user data if token exists
 * - Updates user store
 * - Returns true if authenticated, false otherwise
 */
export async function checkAuthStatus(): Promise<boolean> {
  const accessToken = tokenStorage.loadAccessToken();

  if (!accessToken) {
    clearAuth();
    return false;
  }

  try {
    // Validate token by fetching user
    const response = await getUser();
    const { setUser, setIsAuthenticated } = useUserStore.getState().actions;
    setUser(response.data);
    setIsAuthenticated(true);
    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    clearAuth();
    return false;
  }
}

/**
 * Logout and redirect to sign-in
 * - Clears all auth data
 * - Redirects to sign-in page
 */
export function logout(): void {
  clearAuth();
  router.replace('/(app)/(auth)/sign-in');
}

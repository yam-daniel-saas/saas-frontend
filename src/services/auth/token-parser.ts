import { AxiosResponse } from 'axios';

/**
 * Extract access token from Authorization header
 * - Authorization header with Bearer prefix
 */
export function extractAccessToken(headers: AxiosResponse['headers']): string | null {
  const authHeader = headers['authorization'] || headers['Authorization'];

  if (authHeader && typeof authHeader === 'string') {
    // Remove 'Bearer ' prefix if present
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return authHeader;
  }

  return null;
}

/**
 * Extract refresh token from refresh_token header
 */
export function extractRefreshToken(headers: AxiosResponse['headers']): string | null {
  const refreshToken = headers['refresh_token'] || headers['Refresh-Token'] || null;

  return typeof refreshToken === 'string' ? refreshToken : null;
}

/**
 * Extract tokens from response headers with validation
 * Throws error if tokens are missing
 */
export function extractAndValidateTokens(headers: AxiosResponse['headers']): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = extractAccessToken(headers);
  const refreshToken = extractRefreshToken(headers);

  if (!accessToken || !refreshToken) {
    throw new Error('Tokens not found in response headers');
  }

  return {
    accessToken,
    refreshToken,
  };
}

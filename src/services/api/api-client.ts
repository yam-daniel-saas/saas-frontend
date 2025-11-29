import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '@/services/auth/token-storage';
import { env } from '@/config/env';
import { extractAndValidateTokens } from '../auth/token-parser';
import { urlConfig } from './baseUrl';
import { router } from 'expo-router';
import { clearAuth } from '../auth/auth-utils';

export const apiClient = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = tokenStorage.loadAccessToken();
  config.headers['X-Business-ID'] = env.BUSINESS_ID;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

async function authResponseInterceptorError(error: AxiosError) {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  // Handle 401 Unauthorized - Refresh token logic
  if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const accessToken = await refreshTokens();

      // Retry original request with new access token
      if (originalRequest.headers && accessToken) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }

  // Handle other errors
  return Promise.reject(error);
}

apiClient.interceptors.request.use(authRequestInterceptor, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => response, authResponseInterceptorError);

/**
 * Refresh access token
 * NOTE: Uses raw axios to avoid circular dependency with apiClient
 */
export async function refreshTokens(): Promise<string> {
  try {
    const refreshToken = tokenStorage.loadRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    // Use raw axios to avoid circular dependency with apiClient
    const response = await axios.post(`${urlConfig.authUrl}/firebase/refresh`, {
      refresh_token: refreshToken,
    });

    const { accessToken } = extractAndValidateTokens(response.headers);
    tokenStorage.saveAccessToken(accessToken);

    return accessToken;
  } catch (error: any) {
    console.error('Token refresh failed:', error);

    // Clear auth data
    clearAuth();

    // Navigate to sign-in (only do this once, not in interceptor)
    router.replace('/(app)/(auth)/sign-in');

    throw error;
  }
}

import { storage } from '../storage';

export const AuthStorageKeys = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const tokenStorage = {
  saveAccessToken(accessToken: string) {
    storage.saveString(AuthStorageKeys.ACCESS_TOKEN, accessToken);
  },

  saveRefreshToken(refreshToken: string) {
    storage.saveString(AuthStorageKeys.REFRESH_TOKEN, refreshToken);
  },

  loadAccessToken() {
    return storage.loadString(AuthStorageKeys.ACCESS_TOKEN);
  },

  loadRefreshToken() {
    return storage.loadString(AuthStorageKeys.REFRESH_TOKEN);
  },

  removeAccessToken() {
    storage.remove(AuthStorageKeys.ACCESS_TOKEN);
  },

  removeRefreshToken() {
    storage.remove(AuthStorageKeys.REFRESH_TOKEN);
  },

  clearTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  },
};

import { urlConfig } from '@/services/api/baseUrl';
import { apiClient } from '../api/api-client';
import { User } from '@/types/user';

//TODO: connect to the gateway and use the gateway endpoints

/**
 * Send OTP to phone number
 */
export async function sendOTP(phone: string) {
  return apiClient.post<string>(`${urlConfig.userUrl}/sign_in/send_otp`, {
    phone,
  });
}

export async function SignInWithOtp(phone: string, otp: string) {
  return apiClient.post<User>(`${urlConfig.userUrl}/sign_in/verify_otp`, {
    phone,
    submitted_otp: otp,
  });
}

export async function getUser() {
  return apiClient.get<User>(`${urlConfig.authUrl}/firebase/get_user`);
}

export async function logoutUser() {
  return apiClient.post<void>(`${urlConfig.authUrl}/firebase/logout_user`);
}

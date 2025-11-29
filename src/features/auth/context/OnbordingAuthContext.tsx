import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { router } from 'expo-router';
import { sendOTP } from '@/services/auth/auth-api';
import type { SignInFormData } from '../components/SignInForm';

// Types
interface OnboardingAuthState {
  phoneNumber: string;
}

interface OnboardingAuthContextType extends OnboardingAuthState {
  submitPhoneNumber: (data: SignInFormData) => Promise<void>;
  resetOnboarding: () => void;
}

// Create Context
const OnboardingAuthContext = createContext<OnboardingAuthContextType | undefined>(undefined);

// Provider Props
interface OnboardingAuthProviderProps {
  children: ReactNode;
}

// Provider Component
export function OnboardingAuthProvider({ children }: OnboardingAuthProviderProps) {
  const [state, setState] = useState<OnboardingAuthState>({
    phoneNumber: '',
  });

  /**
   * Submit phone number and request OTP
   */
  const submitPhoneNumber = async (data: SignInFormData) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Send OTP to the phone number
      await sendOTP(data.phone);
      // Update state with phone number
      setState((prev) => ({
        ...prev,
        phoneNumber: data.phone,
      }));

      // Navigate to OTP verification screen
      router.push('/(app)/(auth)/verify-otp');
    } catch (error: any) {
      throw error;
    }
  };

  /**
   * Reset onboarding state
   */
  const resetOnboarding = () => {
    setState({
      phoneNumber: '',
    });
  };

  const value: OnboardingAuthContextType = {
    ...state,
    submitPhoneNumber,
    resetOnboarding,
  };

  return <OnboardingAuthContext.Provider value={value}>{children}</OnboardingAuthContext.Provider>;
}

// Custom Hook
export function useOnboardingAuth() {
  const context = useContext(OnboardingAuthContext);
  if (context === undefined) {
    throw new Error('useOnboardingAuth must be used within OnboardingAuthProvider');
  }
  return context;
}

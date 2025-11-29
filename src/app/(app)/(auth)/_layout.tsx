import React from 'react';
import { Stack } from 'expo-router';
import { OnboardingAuthProvider } from '@/features/auth/context/OnbordingAuthContext';

const AuthLayout = () => {
  return (
    <OnboardingAuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="verify-otp" options={{ headerShown: false }} />
      </Stack>
    </OnboardingAuthProvider>
  );
};

export default AuthLayout;

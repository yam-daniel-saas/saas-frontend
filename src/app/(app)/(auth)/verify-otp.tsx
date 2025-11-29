import { View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboardingAuth } from '@/features/auth/context/OnbordingAuthContext';
import VerifyOtpForm, { type OTPFormData } from '@/features/auth/components/VerifyOtpForm';
import { Text as ThemedText } from '@/components/ui/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { sendOTP } from '@/services/auth/auth-api';
import { router } from 'expo-router';

import { Button } from '@/components/ui/button';
import { signIn } from '@/services/auth/auth-service';

const VerifyOtp = () => {
  const { phoneNumber, submitPhoneNumber } = useOnboardingAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const handleVerifyOTP = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      console.log('Verifying OTP:', data.otp, 'for phone:', phoneNumber);
      await signIn(phoneNumber, data.otp);
      router.replace('/(app)/(protected)');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'קוד אימות שגוי';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!phoneNumber) return;
    setIsResending(true);
    setError(null);

    try {
      await sendOTP(phoneNumber);
      // Show success message or toast
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'שגיאה בשליחת קוד מחדש';
      setError(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background px-6">
      <View className="flex-1 justify-center gap-6">
        {/* Header Section */}
        <View className="items-center gap-2">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Ionicons name="lock-closed-outline" size={32} color="#007AFF" />
          </View>

          <ThemedText className="text-center text-2xl font-bold">אימות טלפון</ThemedText>

          <ThemedText className="text-center text-muted-foreground">
            הזן את קוד האימות שנשלח ל
          </ThemedText>

          {phoneNumber && (
            <ThemedText className="text-center font-semibold text-foreground">
              {phoneNumber}
            </ThemedText>
          )}
        </View>

        {/* OTP Form */}
        <VerifyOtpForm onSubmit={handleVerifyOTP} isLoading={isLoading} error={error} />

        {/* Resend Code Section */}
        <View className="items-center gap-2">
          <ThemedText className="text-sm text-muted-foreground">לא קיבלת קוד?</ThemedText>

          <Pressable onPress={handleResendOTP} disabled={isResending || isLoading}>
            <ThemedText
              className={`text-sm font-semibold ${
                isResending || isLoading ? 'text-muted-foreground' : 'text-primary'
              }`}>
              {isResending ? 'שולח...' : 'שלח שוב'}
            </ThemedText>
          </Pressable>
        </View>
        <Button onPress={() => router.replace('/(app)/(auth)/sign-in')}>שנה מספר טלפון</Button>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtp;

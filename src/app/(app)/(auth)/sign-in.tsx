import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInForm, { SignInFormData } from '@/features/auth/components/SignInForm';
import { useOnboardingAuth } from '@/features/auth/context/OnbordingAuthContext';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { submitPhoneNumber } = useOnboardingAuth();

  async function handleLogin(data: SignInFormData) {
    try {
      setIsLoading(true);
      await submitPhoneNumber(data);
    } catch (error) {
      console.error('Error submitting phone number:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView
        enabled={false}
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        bottomOffset={0}
        contentContainerClassName="flex-1 gap-4 flex-col justify-center px-4">
        <Animated.View entering={FadeInUp.delay(400).springify()} className="">
          <Text
            className="text-center text-[32px] font-bold leading-[1.1] text-foreground"
            accessibilityRole="header">
            התחברות
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <SignInForm onSubmit={handleLogin} isLoading={isLoading} />
        </Animated.View>

        {/* Sign Up Link */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          className="mb-8 flex-row items-center justify-center gap-2">
          <Text className="text-center text-base text-[rgba(99,99,102,0.7)]">לקוחות חדשים?</Text>
          <Pressable onPress={() => router.push('/(app)/(auth)/sign-up')}>
            <Text className="text-center text-base font-semibold text-[#007aff] underline">
              צרו משתמש
            </Text>
          </Pressable>
        </Animated.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

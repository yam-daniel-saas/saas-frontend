import React, { useState } from 'react';
import { Text, Pressable, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';
import { router } from 'expo-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button2Examples } from '@/components/ui/button-2.example';

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleLogin() {
    if (!phoneNumber) {
      return;
    }
    // Handle login logic
    console.log('Login with phone:', phoneNumber);
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
          <Input
            placeholder="הזן מספר טלפון"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            inputClassName=""
          />
        </Animated.View>

        {/* Login Button */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <Button onPress={handleLogin} className="mb-6">
            התחברות
          </Button>
        </Animated.View>

        {/* Sign Up Link */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          className="mb-8 flex-row items-center justify-center gap-2">
          <Text className="text-center text-base text-[rgba(99,99,102,0.7)]">לקוחות חדשים?</Text>
          <Pressable onPress={() => router.push('/(auth)/sign-up')}>
            <Text className="text-center text-base font-semibold text-[#007aff] underline">
              צרו משתמש
            </Text>
          </Pressable>
        </Animated.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

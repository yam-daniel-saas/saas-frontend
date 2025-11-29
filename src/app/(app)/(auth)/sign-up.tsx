import { Button } from '@/components/ui/button';
import React from 'react';
import { View, Text } from 'react-native';
import { Text as ThemedText } from '@/components/ui/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SignUp() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-2xl font-bold">Sign Up Screen</Text>
        <Text className="mt-2 text-gray-500">Coming Soon</Text>
        <Button
          className="w-36"
          variant={'default'}
          onPress={() => router.replace('/(app)/(auth)/sign-in')}>
          <ThemedText variant={'h4'} className="text-white">
            BACK
          </ThemedText>
        </Button>
      </View>
    </SafeAreaView>
  );
}

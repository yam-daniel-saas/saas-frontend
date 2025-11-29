import React from 'react';
import { Stack } from 'expo-router';
import { useUserStore } from '@/store/user-store';

const AppLayout = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* admin app screens  */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* app screens  */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default AppLayout;

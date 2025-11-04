import NavThemeContext from '@/context/theme-context';
import { Slot, SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { queryConfig } from '@/lib/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import '@/i18n';
import '@/global.css';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <NavThemeContext>
          <QueryClientProvider client={queryClient}>
            <RootNavigator />
          </QueryClientProvider>
        </NavThemeContext>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  return <Slot />;
}

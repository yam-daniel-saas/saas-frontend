import NavThemeContext from '@/context/theme-context';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { queryConfig } from '@/lib/react-query';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavThemeContext>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
      </NavThemeContext>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  return <Stack />;
}

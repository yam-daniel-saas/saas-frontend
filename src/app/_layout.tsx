import { Slot, SplashScreen, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from '@/services/react-query/query-config';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import NavThemeContext from '@/context/theme-context';
import SplashScreenController from '@/components/SplashScreenController';
import '@/i18n';
import '@/global.css';

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export default function RootLayout() {
  //add ota update check - https://docs.expo.dev/updates/introduction/
  //add sentry error reporting - https://docs.expo.dev/sentry/introduction/
  //add font loading - https://docs.expo.dev/guides/using-custom-fonts/

  return (
    <KeyboardProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavThemeContext>
          <QueryClientProvider client={queryClient}>
            <SplashScreenController>
              <RootNavigator />
            </SplashScreenController>
          </QueryClientProvider>
        </NavThemeContext>
      </GestureHandlerRootView>
    </KeyboardProvider>
  );
}

function RootNavigator() {
  return <Slot />;
}

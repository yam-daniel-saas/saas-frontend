import { View, ActivityIndicator } from 'react-native';
import React, { PropsWithChildren, useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { checkAuthStatus } from '@/services/auth/auth-service';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const SplashScreenController = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Check if user has valid authentication
        const isAuthenticated = await checkAuthStatus();

        console.log(
          'Auth check complete:',
          isAuthenticated ? 'User authenticated' : 'User not authenticated'
        );
      } catch (error) {
        console.error('Error during app initialization:', error);
      } finally {
        // Mark app as ready and hide splash screen
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // Show loading indicator while checking auth
  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <>{children}</>;
};

export default SplashScreenController;

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Text as ThemedText } from '@/components/ui/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { tokenStorage } from '@/services/auth/token-storage';
import { getUser } from '@/services/auth/auth-api';
import { useUser, useUserStore } from '@/store/user-store';
import { logout } from '@/services/auth/auth-service';

const index = () => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetUser = async () => {
    console.log('user', user);
    console.log(tokenStorage.loadAccessToken());

    try {
      setIsLoading(true);
      const response = await getUser();
      console.log('user response', response);
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center px-2">
      <ThemedText variant={'h1'}>welcome to the app</ThemedText>
      <Button onPress={() => tokenStorage.saveAccessToken('test')}>remove access token</Button>
      <Button onPress={() => tokenStorage.saveRefreshToken('test1')}>remove refresh token</Button>

      <Button onPress={() => handleGetUser()}>get user</Button>

      <TouchableOpacity
        className="h-12 w-full items-center justify-center rounded-md bg-destructive p-2 text-white"
        onPress={() => logout()}>
        <ThemedText variant={'h4'} className="text-white">
          LOGOUT
        </ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});

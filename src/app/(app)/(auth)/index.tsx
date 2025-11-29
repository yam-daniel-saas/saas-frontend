import { Redirect } from 'expo-router';
import { useUserStore } from '@/store/user-store';

export default function Index() {
  // Otherwise, redirect to sign-in
  return <Redirect href="/(app)/(auth)/sign-in" />;
}

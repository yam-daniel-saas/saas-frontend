import { Redirect } from 'expo-router';

export default function Index() {
  // For now, redirect to sign-in screen
  // Later, you can add logic to check if user is authenticated
  // and redirect to either sign-in or protected routes
  return <Redirect href="/(auth)/sign-in" />;
}

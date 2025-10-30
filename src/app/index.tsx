import { Container } from '@/components/Container';
import { Stack, Link } from 'expo-router';

import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Text>Hello World</Text>
      </Container>
    </View>
  );
}

const styles = {
  container: 'flex flex-1 bg-white',
};

import { ThemeProvider as RNThemeProvider } from '@react-navigation/native';
import React from 'react';
import { NAV_THEME } from '@/theme/colors';
import { useColorScheme } from '@/hooks/use-color-schema';

export default function NavThemeContext({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();
  return <RNThemeProvider value={NAV_THEME[colorScheme]}>{children}</RNThemeProvider>;
}

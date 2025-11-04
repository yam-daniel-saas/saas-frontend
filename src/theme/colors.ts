import { DefaultTheme, Theme } from '@react-navigation/native';

//TODO: Add dark theme
const THEME = {
  white: 'hsl(0 0% 100%)',
  black: 'hsl(0 0% 0%)',
  light: {
    background: 'hsl(0 0% 94%)', // #f0f0f0 - Light gray background
    foreground: 'hsl(240 2% 39.8%)', // rgba(99,99,102,0.7) - Primary text gray
    card: 'hsl(0 0% 100%)', // #ffffff - Pure white for cards
    cardForeground: 'hsl(240 2% 39.8%)', // Text on cards
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(240 2% 39.8%)',
    primary: 'hsl(211 100% 50%)', // #007aff - Primary blue
    primaryForeground: 'hsl(0 0% 100%)', // White text on primary
    secondary: 'hsl(0 0% 94.1%)', // #f0f0f0 - Light gray for secondary elements
    secondaryForeground: 'hsl(240 2% 39.8%)',
    muted: 'hsl(0 0% 92.2%)', // rgba(235,235,235,0.8) - Muted backgrounds
    mutedForeground: 'hsl(240 2% 39.8%)', // rgba(99,99,102,0.5) - Muted text
    accent: 'hsl(211 100% 50%)', // Primary blue for accents
    accentForeground: 'hsl(0 0% 100%)',
    destructive: 'hsl(353 93% 52%)', // #f41d30 - Red for errors
    border: 'hsl(0 0% 92.2%)', // rgba(235,235,235,0.8) - Light borders
    input: 'hsl(0 0% 92.2%)', // Input borders
    ring: 'hsl(211 100% 50%)', // Focus ring uses primary blue
    radius: '0.625rem',
    chart1: 'hsl(211 100% 50%)', // Primary blue
    chart2: 'hsl(173 58% 39%)',
    chart3: 'hsl(197 37% 24%)',
    chart4: 'hsl(43 74% 66%)',
    chart5: 'hsl(27 87% 67%)',
  },
  dark: {
    background: 'hsl(0 0% 7%)', // Dark background
    foreground: 'hsl(0 0% 98%)', // Light text on dark
    card: 'hsl(0 0% 10%)', // Slightly lighter dark for cards
    cardForeground: 'hsl(0 0% 98%)',
    popover: 'hsl(0 0% 10%)',
    popoverForeground: 'hsl(0 0% 98%)',
    primary: 'hsl(211 100% 50%)', // #007aff - Primary blue (same as light)
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(0 0% 15%)', // Dark gray for secondary
    secondaryForeground: 'hsl(0 0% 98%)',
    muted: 'hsl(0 0% 15%)',
    mutedForeground: 'hsl(0 0% 65%)',
    accent: 'hsl(211 100% 50%)', // Primary blue for accents
    accentForeground: 'hsl(0 0% 100%)',
    destructive: 'hsl(353 93% 52%)', // #f41d30 - Red for errors (same as light)
    border: 'hsl(0 0% 20%)', // Dark borders
    input: 'hsl(0 0% 20%)',
    ring: 'hsl(211 100% 50%)', // Focus ring uses primary blue
    radius: '0.625rem',
    chart1: 'hsl(211 100% 50%)', // Primary blue
    chart2: 'hsl(173 58% 39%)',
    chart3: 'hsl(197 37% 24%)',
    chart4: 'hsl(43 74% 66%)',
    chart5: 'hsl(27 87% 67%)',
  },
} as const;

const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DefaultTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
} as const;

export { THEME, NAV_THEME };

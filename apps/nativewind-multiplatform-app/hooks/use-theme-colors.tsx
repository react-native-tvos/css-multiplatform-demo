import { useColorScheme } from 'nativewind';

type ColorSchemeName = 'light' | 'dark';

export enum ThemedColorNames {
  text = 'text',
  background = 'background',
  tint = 'tint',
  green = 'green',
  red = 'red',
  special = 'special',
  tabBarBackground = 'tabBarBackground',
  tabBarDefault = 'tabBarDefault',
  tabBarSelected = 'tabBarSelected',
}

const themeColors: {
  [key in ColorSchemeName]: { [key in ThemedColorNames]: string };
} = {
  light: {
    text: '#11181C',
    background: '#f8f9fa',
    tint: '#0a7ea4',
    green: '#166534',
    red: '#991b1b',
    special: '#d4d4d4',
    tabBarBackground: '#0a7ea4',
    tabBarDefault: '#f8f9fa',
    tabBarSelected: '#fde047',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#88ccff',
    green: '#86efac',
    red: '#fca5a5',
    special: '#0f172a',
    tabBarBackground: '#88ccff',
    tabBarDefault: '#151718',
    tabBarSelected: '#dc2626',
  },
};

export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  return themeColors[colorScheme === 'unspecified' ? 'light' : colorScheme];
}

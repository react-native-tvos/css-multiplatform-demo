import { useNativeVariable as useFunctionalVariable } from 'react-native-css';

// CSS Variable hook

export const useCSSVariable =
  process.env.EXPO_OS !== 'web'
    ? useFunctionalVariable
    : (variable: string) => `var(${variable})`;

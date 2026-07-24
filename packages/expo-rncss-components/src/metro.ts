import type { MetroConfig } from 'expo/metro-config';

const REDIRECT_MAP: Record<string, string> = {
  'react-native': '@expo/rncss-components/entries/react-native',
  'react-native-safe-area-context':
    '@expo/rncss-components/entries/react-native-safe-area-context',
  'expo-image': '@expo/rncss-components/entries/expo-image',
  'expo-video': '@expo/rncss-components/entries/expo-video',
  '@legendapp/list': '@expo/rncss-components/entries/legendapp-list',
};

export function withExpoComponents(config: MetroConfig): MetroConfig {
  const originalResolveRequest = config.resolver?.resolveRequest;

  (config as any).resolver = {
    ...config.resolver,
    resolveRequest(context: any, moduleName: string, platform: string | null) {
      // Skip interception for imports originating from within @expo/rncss-components
      // to prevent circular resolution
      if (context.originModulePath?.includes('@expo/rncss-components')) {
        if (originalResolveRequest) {
          return originalResolveRequest(context, moduleName, platform);
        }
        return context.resolveRequest(context, moduleName, platform);
      }

      // Intercept imports from the targeted packages
      const redirectTo = REDIRECT_MAP[moduleName];
      if (redirectTo) {
        try {
          const resolveRequest =
            originalResolveRequest ?? context.resolveRequest;
          return resolveRequest(context, redirectTo, platform);
        } catch {
          // Fall back to original resolution if redirect fails
        }
      }

      // Default resolution
      if (originalResolveRequest) {
        return originalResolveRequest(context, moduleName, platform);
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  };

  return config;
}

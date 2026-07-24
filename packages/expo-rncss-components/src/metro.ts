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
      // Only redirect imports from first-party app code. Skip anything from
      // node_modules — redirecting react-native's own internal imports (e.g.
      // @react-native-tvos/virtualized-lists doing `import { ScrollView }`)
      // hands library internals a CSS-wrapped component that lacks the static
      // members / ref behavior they depend on (ScrollView.Context, etc.).
      //
      // Also skip this package's own files. Its real monorepo path lives under
      // packages/ (not node_modules), so match the unscoped directory name to
      // prevent the entry .cjs and wrapped components from redirecting their
      // own `react-native` imports back onto themselves (circular resolution).
      const origin = context.originModulePath ?? '';
      if (origin.includes('node_modules') || origin.includes('rncss-components')) {
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

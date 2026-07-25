import type { MetroConfig } from 'expo/metro-config';

// Bare-specifier redirects. These fire on native, where app code's
// `import { View } from 'react-native'` reaches Metro resolution unchanged.
const REDIRECT_MAP: Record<string, string> = {
  'react-native': '@expo/rncss-components/entries/react-native',
  'react-native-safe-area-context':
    '@expo/rncss-components/entries/react-native-safe-area-context',
  'expo-image': '@expo/rncss-components/entries/expo-image',
  'expo-video': '@expo/rncss-components/entries/expo-video',
  '@legendapp/list': '@expo/rncss-components/entries/legendapp-list',
};

// The react-native exports we replace with CSS-wrapped versions.
//
// On web, `babel-plugin-react-native-web` rewrites `import { View } from
// 'react-native'` to a default import from `react-native-web/dist/exports/View`
// at compile time, before Metro resolution. That means the bare 'react-native'
// key in REDIRECT_MAP never matches on web. So for web we intercept the deep
// react-native-web export paths instead and redirect each to the matching
// wrapped module (which itself imports the real component — its origin is
// skipped below, so no circular resolution).
const WEB_WRAPPED_COMPONENTS = new Set([
  'View',
  'Text',
  'TextInput',
  'ScrollView',
  'FlatList',
  'Pressable',
  'TouchableOpacity',
  'TouchableHighlight',
]);

const WEB_RNW_EXPORT = /^react-native-web\/dist\/(?:cjs\/)?exports\/([A-Za-z]+)$/;

function webRedirect(moduleName: string): string | undefined {
  const name = WEB_RNW_EXPORT.exec(moduleName)?.[1];
  if (name && WEB_WRAPPED_COMPONENTS.has(name)) {
    return `@expo/rncss-components/components/react-native/${name}`;
  }
  return undefined;
}

export function withExpoComponents(config: MetroConfig): MetroConfig {
  const originalResolveRequest = config.resolver?.resolveRequest;

  (config as any).resolver = {
    ...config.resolver,
    resolveRequest(context: any, moduleName: string, platform: string | null) {
      const resolve = originalResolveRequest ?? context.resolveRequest;

      // Only redirect imports from first-party app code. Skip anything from
      // node_modules — redirecting react-native's own internal imports (e.g.
      // @react-native-tvos/virtualized-lists doing `import { ScrollView }`)
      // hands library internals a CSS-wrapped component that lacks the static
      // members / ref behavior they depend on (ScrollView.Context, etc.).
      //
      // Also skip this package's own files. Its real monorepo path lives under
      // packages/ (not node_modules), so match the unscoped directory name to
      // prevent the entry .cjs and wrapped components from redirecting their
      // own react-native imports back onto themselves (circular resolution).
      const origin = context.originModulePath ?? '';
      if (origin.includes('node_modules') || origin.includes('rncss-components')) {
        return resolve(context, moduleName, platform);
      }

      const redirectTo =
        REDIRECT_MAP[moduleName] ??
        (platform === 'web' ? webRedirect(moduleName) : undefined);
      if (redirectTo) {
        try {
          return resolve(context, redirectTo, platform);
        } catch {
          // Fall back to original resolution if redirect fails.
        }
      }

      return resolve(context, moduleName, platform);
    },
  };

  return config;
}

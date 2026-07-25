/**
 * Babel plugin that rewrites first-party imports of the components we CSS-wrap
 * to the wrapped modules, on every platform:
 *
 *   import { View, Platform } from 'react-native';
 *   import { SafeAreaView } from 'react-native-safe-area-context';
 *   // becomes
 *   import View from '@expo/rncss-components/components/react-native/View';
 *   import { Platform } from 'react-native';
 *   import SafeAreaView from '@expo/rncss-components/components/react-native-safe-area-context/SafeAreaView';
 *
 * This is the single mechanism that swaps in the wrapped components. It replaces
 * a Metro resolver redirect for two reasons:
 *
 *  - On web, `babel-plugin-react-native-web` (in `babel-preset-expo`) rewrites
 *    `react-native` imports to `react-native-web/dist/exports/*` at compile
 *    time, before Metro resolution — so a resolver keyed on the bare
 *    `react-native` specifier never fires. Config-level plugins run before
 *    preset plugins, so this plugin claims the wrapped components first.
 *  - Rewriting only the wrapped named imports (leaving everything else on the
 *    original module) means non-wrapped exports — Platform, StyleSheet,
 *    useTVEventHandler, useVideoPlayer, etc. — resolve to the real package
 *    untouched. No forwarding shim, and nothing to keep in sync with the
 *    upstream export surface.
 *
 * First-party only: files under node_modules — including this package's own
 * wrapped components — are skipped, so library internals keep the real
 * components (statics, refs, forwardRef), and each wrapped module's own import
 * of the real component is left alone.
 */

// Source module -> the named exports we replace with CSS-wrapped versions.
// The wrapped module for `<name>` lives at
// `@expo/rncss-components/components/<source>/<name>`.
const WRAP_MAP: Record<string, string[]> = {
  'react-native': [
    'View',
    'Text',
    'TextInput',
    'ScrollView',
    'FlatList',
    'Pressable',
    'TouchableOpacity',
    'TouchableHighlight',
  ],
  'react-native-safe-area-context': ['SafeAreaView'],
  'expo-image': ['Image'],
  'expo-video': ['VideoView'],
  '@legendapp/list': ['LegendList'],
};

const WRAP_SETS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(WRAP_MAP).map(([source, names]) => [source, new Set(names)]),
);

export default function rncssComponentsBabelPlugin({
  types: t,
}: {
  types: any;
}): any {
  return {
    name: 'rncss-wrap-components',
    visitor: {
      ImportDeclaration(path: any, state: any) {
        const filename: string = state.file?.opts?.filename ?? '';
        if (
          filename.includes('node_modules') ||
          filename.includes('rncss-components')
        ) {
          return;
        }

        const source: string = path.node.source.value;
        const wrappedNames = WRAP_SETS[source];
        if (!wrappedNames) {
          return;
        }

        const wrappedImports: any[] = [];
        const keptSpecifiers: any[] = [];
        for (const spec of path.node.specifiers) {
          if (
            t.isImportSpecifier(spec) &&
            t.isIdentifier(spec.imported) &&
            wrappedNames.has(spec.imported.name)
          ) {
            wrappedImports.push(
              t.importDeclaration(
                [t.importDefaultSpecifier(t.identifier(spec.local.name))],
                t.stringLiteral(
                  `@expo/rncss-components/components/${source}/${spec.imported.name}`,
                ),
              ),
            );
          } else {
            keptSpecifiers.push(spec);
          }
        }

        if (wrappedImports.length === 0) {
          return;
        }

        const replacement: any[] = [...wrappedImports];
        if (keptSpecifiers.length > 0) {
          replacement.push(
            t.importDeclaration(keptSpecifiers, t.stringLiteral(source)),
          );
        }
        path.replaceWithMultiple(replacement);
      },
    },
  };
}

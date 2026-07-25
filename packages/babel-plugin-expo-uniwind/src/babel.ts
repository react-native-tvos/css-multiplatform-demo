/**
 * Babel plugin that rewrites first-party imports of the third-party components
 * we wrap for Uniwind to the wrapped modules:
 *
 *   import { SafeAreaView } from 'react-native-safe-area-context';
 *   import { Image } from 'expo-image';
 *   // becomes
 *   import SafeAreaView from 'babel-plugin-expo-uniwind/components/react-native-safe-area-context/SafeAreaView';
 *   import Image from 'babel-plugin-expo-uniwind/components/expo-image/Image';
 *
 * Unlike the react-native-css equivalent, there is NO `react-native` entry:
 * Uniwind gives React Native core components (View, Text, Pressable, …)
 * className support natively, so only third-party components need wrapping via
 * `withUniwind`.
 *
 * Only wrapped named imports are rewritten; other specifiers stay on the
 * original module (e.g. `useVideoPlayer` from expo-video). Files under
 * node_modules — including this package's own wrapped components — are skipped,
 * so each wrapped module's own import of the real component resolves normally.
 */

// Source module -> the named exports we replace with wrapped versions.
// The wrapped module for `<name>` lives at
// `babel-plugin-expo-uniwind/components/<source>/<name>`.
const WRAP_MAP: Record<string, string[]> = {
  'react-native-safe-area-context': ['SafeAreaView'],
  'expo-image': ['Image'],
  'expo-video': ['VideoView'],
  '@legendapp/list': ['LegendList'],
};

const WRAP_SETS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(WRAP_MAP).map(([source, names]) => [source, new Set(names)]),
);

export default function uniwindComponentsBabelPlugin({
  types: t,
}: {
  types: any;
}): any {
  return {
    name: 'uniwind-wrap-components',
    visitor: {
      ImportDeclaration(path: any, state: any) {
        const filename: string = state.file?.opts?.filename ?? '';
        if (
          filename.includes('node_modules') ||
          filename.includes('expo-uniwind')
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
                  `babel-plugin-expo-uniwind/components/${source}/${spec.imported.name}`,
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

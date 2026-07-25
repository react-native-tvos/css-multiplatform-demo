# babel-plugin-expo-rncss

CSS-wrapped components for [react-native-css](https://github.com/marklawlor/react-native-css) / [NativeWind v5](https://www.nativewind.dev/), plus a Babel plugin that swaps them in transparently.

## What it does

NativeWind v5 uses `react-native-css` to apply Tailwind class names to React Native and Expo components. With `globalClassNamePolyfill` disabled, components must be wrapped with `useCssElement()` so `className` is converted into native styles.

This package provides drop-in CSS-wrapped replacements for:

- **react-native** — `View`, `Text`, `TextInput`, `ScrollView`, `FlatList`, `Pressable`, `TouchableOpacity`, `TouchableHighlight`, and their `Animated` variants (`AnimatedView`, `AnimatedText`, `AnimatedScrollView`)
- **react-native-safe-area-context** — `SafeAreaView`
- **expo-image** — `Image`
- **expo-video** — `VideoView`
- **@legendapp/list** — `LegendList`

The Babel plugin rewrites first-party imports of these components to the wrapped modules, so app code imports from the original packages as usual.

## How it works

Each wrapped component follows the same pattern:

```tsx
import { View as RNView } from 'react-native';
import { useCssElement } from 'react-native-css';

const View = (props) => {
  return useCssElement(RNView, props, { className: 'style' });
};
```

The `{ className: 'style' }` mapping tells `react-native-css` to resolve the `className` prop and merge the result into `style`.

### Babel plugin

`babel-plugin-expo-rncss/babel` rewrites first-party imports of the wrapped named exports to the wrapped modules, leaving everything else on the original module:

```tsx
import { View, Platform } from 'react-native';
// becomes
import View from 'babel-plugin-expo-rncss/components/react-native/View';
import { Platform } from 'react-native';
```

Add it to the app's `babel.config.js` — config-level plugins run before preset plugins, so it runs before `babel-plugin-react-native-web` (in `babel-preset-expo`), which on web rewrites `react-native` imports to `react-native-web/dist/exports/*` at compile time:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['babel-plugin-expo-rncss/babel'],
  };
};
```

Disable the polyfill in `metro.config.js` so only the wrapped components get `className`:

```js
module.exports = withNativewind(config, {
  inlineVariables: false,
  globalClassNamePolyfill: false,
});
```

Because only the wrapped names are rewritten, non-wrapped exports (`Platform`, `StyleSheet`, `useTVEventHandler`, `useVideoPlayer`, …) resolve to the real package untouched — no forwarding shim, and nothing to keep in sync with the upstream export surface. Files under `node_modules` (and this package's own files) are skipped, so library internals keep the real components.

## Package structure

```
src/
  babel.ts               # Babel plugin (import rewrite) — the package entry
  components/
    useCSSVariable.tsx    # CSS variable hook (native + web)
    react-native/         # Wrapped RN components (View, Text, etc.)
    react-native-safe-area-context/
    expo-image/
    expo-video/
    @legendapp/list/
```

The package main (`.`) and `./babel` both resolve to the Babel plugin. The wrapped components are only reached through the plugin's import rewrites (`./components/*`), so a third-party wrapper is bundled only when the app actually imports that component.

## Peer dependencies

Required:

- `react` and `react-native`
- `react-native-css`

Optional — only needed if the app uses the matching wrapped component (marked `optional` in `peerDependenciesMeta`, so apps that don't use them get no install warnings):

- `react-native-reanimated` (for the `Animated*` wrappers)
- `react-native-safe-area-context` (`SafeAreaView`)
- `expo-image` (`Image`)
- `expo-video` (`VideoView`)
- `@legendapp/list` (`LegendList`)

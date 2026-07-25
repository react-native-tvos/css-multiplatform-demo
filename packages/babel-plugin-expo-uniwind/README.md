# babel-plugin-expo-uniwind

`className`-enabled components for [Uniwind](https://docs.uniwind.dev/), plus a Babel plugin that swaps them in transparently.

## What it does

Uniwind gives React Native core components (`View`, `Text`, `Pressable`, …) `className` support natively, so they never need wrapping. Third-party components do, via `withUniwind()`.

This package provides `withUniwind`-wrapped replacements for:

- **expo-image** — `Image`
- **expo-video** — `VideoView`
- **react-native-safe-area-context** — `SafeAreaView`
- **@legendapp/list** — `LegendList`

The Babel plugin rewrites first-party imports of these components to the wrapped modules, so app code imports from the original packages as usual.

## How it works

Each wrapped component is a one-line `withUniwind()` call:

```tsx
import { Image as ExpoImage } from 'expo-image';
import { withUniwind } from 'uniwind';

export default withUniwind(ExpoImage);
```

### Babel plugin

`babel-plugin-expo-uniwind/babel` rewrites first-party imports of the wrapped named exports to the wrapped modules, leaving everything else on the original module:

```tsx
import { VideoView, useVideoPlayer } from 'expo-video';
// becomes
import VideoView from 'babel-plugin-expo-uniwind/components/expo-video/VideoView';
import { useVideoPlayer } from 'expo-video';
```

Unlike `babel-plugin-expo-rncss`, there is no `react-native` entry — Uniwind styles core components natively, so only third-party components are rewritten.

Add it to the app's `babel.config.js`:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['babel-plugin-expo-uniwind/babel'],
  };
};
```

Files under `node_modules` (and this package's own files) are skipped, so library internals keep the real components.

## Package structure

```
src/
  index.ts               # Barrel — re-exports all wrapped components
  babel.ts               # Babel plugin (import rewrite)
  components/
    react-native-safe-area-context/
    expo-image/
    expo-video/
    @legendapp/list/
```

## Peer dependencies

This package expects the following to be installed in your app:

- `react` and `react-native`
- `uniwind`
- `react-native-safe-area-context`
- `expo-image`
- `expo-video`
- `@legendapp/list`

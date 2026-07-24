# @expo/rncss-components

CSS-wrapped React Native components for use with [react-native-css](https://github.com/marklawlor/react-native-css) and [NativeWind v5](https://www.nativewind.dev/).

## What it does

NativeWind v5 uses `react-native-css` to apply Tailwind CSS class names to React Native and Expo components. For this to work, components need to be wrapped with `useCssElement()` so that `className` props are converted into native styles.

This package provides drop-in CSS-wrapped replacements for commonly used components from:

- **react-native** — `View`, `Text`, `TextInput`, `ScrollView`, `FlatList`, `Pressable`, `TouchableOpacity`, `TouchableHighlight`, and their `Animated` variants (`AnimatedView`, `AnimatedText`, `AnimatedScrollView`)
- **react-native-safe-area-context** — `SafeAreaView`
- **expo-image** — `Image`
- **expo-video** — `VideoView`
- **@legendapp/list** — `LegendList`

It also provides a Metro config to transparently redirect imports from the original packages to the above CSS-wrapped components.

## How it works

Each wrapped component follows the same pattern:

```tsx
import { View as RNView } from 'react-native';
import { useCssElement } from 'react-native-css';

const View = (props) => {
  return useCssElement(RNView, props, { className: 'style' });
};
```

The `{ className: 'style' }` mapping tells `react-native-css` to resolve the `className` prop and merge the result into the `style` prop.

### Metro resolver

The package includes a Metro config helper (`withExpoComponents`) that transparently redirects imports from the original packages to the CSS-wrapped versions. This means app code can import from `react-native`, `expo-image`, etc. as usual, and the wrapped components are used automatically.

```js
// metro.config.js
const { withExpoComponents } = require('@expo/rncss-components/metro');

module.exports = withExpoComponents(config);
```

The resolver intercepts imports for the packages listed above and redirects them to entry modules that re-export everything from the original package, overriding only the components that have CSS wrappers. Imports originating from within `@expo/rncss-components` itself are not intercepted, preventing circular resolution.

## Package structure

```
src/
  index.ts              # Main export — re-exports all wrapped components
  metro.ts              # Metro resolver helper (withExpoComponents)
  components/
    useCSSVariable.tsx   # CSS variable hook (native + web)
    react-native/        # Wrapped RN components (View, Text, etc.)
    react-native-safe-area-context/
    expo-image/
    expo-video/
    @legendapp/list/
  entries/
    react-native.ts     # Re-exports RN + overrides with wrapped versions
    react-native-safe-area-context.ts
    expo-image.ts
    expo-video.ts
    legendapp-list.ts
```

## Peer dependencies

This package expects the following to be installed in your app:

- `react` and `react-native`
- `react-native-css`
- `react-native-reanimated` (for Animated component wrappers)
- `react-native-safe-area-context`
- `expo-image`
- `expo-video`
- `expo-router`
- `@legendapp/list`

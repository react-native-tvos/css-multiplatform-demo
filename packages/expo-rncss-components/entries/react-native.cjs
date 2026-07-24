"use strict";

/**
 * Lazy re-export of `react-native` with CSS-wrapped component overrides.
 *
 * This file is hand-authored CommonJS (`.cjs`) on purpose, mirroring how
 * `react-native-css` ships `components/index.cjs`. Two properties matter:
 *
 *   1. Every export is a getter that only `require`s on access, so nothing is
 *      materialized at module-eval time.
 *   2. Because Metro treats `.cjs` as CommonJS, it does not inject the
 *      React Refresh export-registration that enumerates (and thus triggers)
 *      every binding. An ESM `export * from 'react-native'` gets enumerated,
 *      which fires react-native's lazy getters — e.g. `PushNotificationIOS`
 *      builds a `NativeEventEmitter` on a null native module and throws
 *      "requires a non-null argument" at bootstrap.
 *
 * Forwarding via `Object.keys(ReactNative)` (which reads property NAMES without
 * invoking getters) also means tvOS-only APIs such as `useTVEventHandler` are
 * carried through, unlike a hand-maintained static allow-list.
 */

const ReactNative = require("react-native");

// CSS-wrapped overrides. Keys here shadow the same-named react-native exports;
// Animated* are additions that do not exist on react-native.
const overrides = {
  View: () => require("../build/components/react-native/View").default,
  Text: () => require("../build/components/react-native/Text").default,
  TextInput: () => require("../build/components/react-native/TextInput").default,
  ScrollView: () =>
    require("../build/components/react-native/ScrollView").default,
  FlatList: () => require("../build/components/react-native/FlatList").default,
  Pressable: () => require("../build/components/react-native/Pressable").default,
  TouchableOpacity: () =>
    require("../build/components/react-native/TouchableOpacity").default,
  TouchableHighlight: () =>
    require("../build/components/react-native/TouchableHighlight").default,
  AnimatedView: () =>
    require("../build/components/react-native/AnimatedView").default,
  AnimatedText: () =>
    require("../build/components/react-native/AnimatedText").default,
  AnimatedScrollView: () =>
    require("../build/components/react-native/AnimatedScrollView").default,
};

// Forward every react-native export lazily, except those we override.
for (const key of Object.keys(ReactNative)) {
  if (key in overrides) continue;
  Object.defineProperty(module.exports, key, {
    enumerable: true,
    configurable: true,
    get() {
      return ReactNative[key];
    },
  });
}

// Apply the CSS-wrapped overrides and additions.
for (const key of Object.keys(overrides)) {
  Object.defineProperty(module.exports, key, {
    enumerable: true,
    configurable: true,
    get: overrides[key],
  });
}

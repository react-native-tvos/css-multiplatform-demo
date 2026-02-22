# css-multiplatform-demo

A Yarn workspaces monorepo demonstrating how [Tailwind CSS](https://tailwindcss.com/) styles can be used across all React Native platforms — web, mobile (iOS, iPadOS, Android), and TV (Apple TV, Android TV).

## Workspaces

### Apps

| Workspace                                                                  | Description                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`apps/nativewind-multiplatform-app`](./apps/nativewind-multiplatform-app) | Nativewind v5 app — builds for web, mobile, and TV |
| [`apps/uniwind-multiplatform-app`](./apps/uniwind-multiplatform-app) | Uniwind app — builds for web, mobile, and TV |

### Packages

| Workspace                                                      | Description                                                                                                                                           |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`packages/expo-rncss-components`](./packages/expo-rncss-components) | `@expo/rncss-components` — CSS-wrapped React Native and Expo components, and a Metro resolver for transparent `className` support via `react-native-css`. Used by [`apps/nativewind-multiplatform-app`](./apps/nativewind-multiplatform-app). |

## Getting started

```sh
yarn install
```

Then follow the build instructions in the [Nativewind app README](./apps/nativewind-multiplatform-app/README.md) or the [Uniwind app README](./apps/uniwind-multiplatform-app/README.md).

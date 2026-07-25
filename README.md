# css-multiplatform-demo

A pnpm workspaces monorepo demonstrating how [Tailwind CSS](https://tailwindcss.com/) styles can be used across all React Native platforms — web, mobile (iOS, iPadOS, Android), and TV (Apple TV, Android TV).

## Workspaces

### Apps

| Workspace                                                                  | Description                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`apps/nativewind-multiplatform-app`](./apps/nativewind-multiplatform-app) | Nativewind v5 app — builds for web, mobile, and TV |
| [`apps/uniwind-multiplatform-app`](./apps/uniwind-multiplatform-app) | Uniwind app — builds for web, mobile, and TV |
| [`apps/2048-tv`](./apps/2048-tv) | 2048 game for TV (Nativewind v5), controlled by the TV remote |

### Packages

| Workspace                                                      | Description                                                                                                                                           |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`packages/babel-plugin-expo-rncss`](./packages/babel-plugin-expo-rncss) | `babel-plugin-expo-rncss` — CSS-wrapped React Native and Expo components (via `react-native-css`), and a Babel plugin that rewrites imports to them. Used by [`apps/nativewind-multiplatform-app`](./apps/nativewind-multiplatform-app) and [`apps/2048-tv`](./apps/2048-tv). |
| [`packages/babel-plugin-expo-uniwind`](./packages/babel-plugin-expo-uniwind) | `babel-plugin-expo-uniwind` — `withUniwind`-wrapped third-party components, and a Babel plugin that rewrites imports to them. Used by [`apps/uniwind-multiplatform-app`](./apps/uniwind-multiplatform-app). |

## Getting started

```sh
pnpm install
```

Then follow the build instructions in the [Nativewind app README](./apps/nativewind-multiplatform-app/README.md) or the [Uniwind app README](./apps/uniwind-multiplatform-app/README.md).

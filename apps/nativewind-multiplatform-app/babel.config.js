// The babel-plugin-expo-rncss plugin rewrites first-party imports of the
// CSS-wrapped components to the wrapped modules. It must run before
// babel-plugin-react-native-web (in babel-preset-expo) on web, which is
// guaranteed because config-level plugins run before preset plugins.
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: ['babel-plugin-expo-rncss/babel'],
  };
};

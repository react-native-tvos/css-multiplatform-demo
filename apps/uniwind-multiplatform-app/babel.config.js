// The babel-plugin-expo-uniwind plugin rewrites first-party imports of the
// wrapped third-party components (expo-image, expo-video,
// react-native-safe-area-context, @legendapp/list) to their withUniwind-wrapped
// modules. React Native core components are not rewritten — Uniwind gives them
// className support natively.
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: ['babel-plugin-expo-uniwind'],
  };
};

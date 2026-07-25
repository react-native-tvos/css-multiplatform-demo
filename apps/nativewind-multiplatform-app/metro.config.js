// Learn more https://docs.expo.io/guides/customizing-metro
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Watch the monorepo root for workspace packages
config.watchFolders = [monorepoRoot];

// Ensure Metro resolves from the app's node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// The CSS-wrapped components are swapped in by the @expo/rncss-components babel
// plugin (see babel.config.js), so no custom resolver is needed here.
module.exports = withNativewind(config, {
  inlineVariables: false,
  globalClassNamePolyfill: false,
});

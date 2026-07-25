// Package entry: re-export the Babel plugin so it can be referenced by the bare
// package name (`plugins: ['babel-plugin-expo-rncss']`), without the `/babel`
// subpath. Only the plugin is re-exported here — never the wrapped components —
// so importing the package pulls in no third-party dependencies.
export { default } from './babel.js';

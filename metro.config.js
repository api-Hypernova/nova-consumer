// Default Expo config. When NOVA_EXPO_GO=1 (set only by the Expo Go demo services on the server),
// native libraries that Expo Go does not contain are replaced by stand-ins from ./expo-go-shims.
// Normal builds (no env var) are unchanged.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const config = getDefaultConfig(__dirname);
if (process.env.NOVA_EXPO_GO === '1') {
  const shims = require('./expo-go-shims/map.json');
  const prev = config.resolver.resolveRequest;
  config.resolver.resolveRequest = (ctx, name, platform) =>
    shims[name]
      ? { type: 'sourceFile', filePath: path.join(__dirname, 'expo-go-shims', shims[name]) }
      : (prev || ctx.resolveRequest)(ctx, name, platform);
  config.cacheVersion = 'nova-expo-go-shims-1';
}
module.exports = config;

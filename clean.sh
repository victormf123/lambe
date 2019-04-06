watchman watch-dell-all
rm -rf node_modules && npm install
rm -rf /tmp/metro-bundler-cache-*
rm -f /tmp/haste-map-react-native-packager-*
npm start -- --reset-cache

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // Disable auto-linking for iOS to avoid font duplication issues
      },
    },
  },
  // assets: ['./src/assets/fonts/'], // Custom font path
};
module.exports = {
  assets: ['./node_modules/react-native-vector-icons/Fonts'],
};
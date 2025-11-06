module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@' : './',
            '@components': './src/components',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@api': './src/api',
          },
        },
      ],
      // "expo-router/babel"
    ],
  };
};
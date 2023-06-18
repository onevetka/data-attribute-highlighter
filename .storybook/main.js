module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config, { configType }) => {
    const path = require('path');
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[local]--[hash:base64:5]',
              exportLocalsConvention: 'camelCase',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
  docs: {
    autodocs: true,
  },
};

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config, { configType }) => {
    const path = require('path');

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader?modules=true'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  }
}
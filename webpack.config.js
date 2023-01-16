const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
};

// 3) Добавьте в package.json скрипт с именем build со значением webpack --mode production. С его помощью мы будем собирать Webpack'ом код для публикации проекта.

// 4) Собираемые с помощью Webpack файлы не должны попасть в репозиторий, поэтому добавьте их в .gitignore.

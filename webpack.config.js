const path         = require('path'),
      MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: './lib/index.js',
  plugins: [
    new MinifyPlugin()
  ],
  output: {
    filename: 'smartquotes.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'smartquotes'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: ['es2015']
        }
      }
    ]
  }
};

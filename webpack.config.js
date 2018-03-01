var webpack = require("webpack");

module.exports = {
  output: {
    path: __dirname +'/build/',
    filename: '[name].js',
  },
  resolve: {
    extensions: [ '.js', '.ts', '.tsx'],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devtool: "source-map"
};
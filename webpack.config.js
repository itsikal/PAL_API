var webpack = require("webpack");

module.exports = {
  entry: __dirname + '/src/api.ts',
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
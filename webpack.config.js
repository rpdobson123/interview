/* eslint-disable no-var */
'use strict';

var PORT = 8080;

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryPoint = [
  './index.jsx',
  'webpack-dev-server/client?http://0.0.0.0:' + PORT,
  'webpack/hot/only-dev-server',
];

module.exports = {
  plugins : [
    new HtmlWebpackPlugin({
      filename : 'index.html',
      template : 'index.html',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  entry : entryPoint,
  target : 'web',
  output : {
    path : path.join(__dirname, 'dist'),
    filename : 'js/[name]-[hash].js',
    chunkFilename : 'js/[id].chunk.js',
    sourceMapFilename : 'js/[name]-[hash].map',
    devtoolModuleFilenameTemplate : 'file://[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate : 'file://[absolute-resource-path]?[hash]',
  },
  resolve : {
    root : __dirname,
    modulesDirectories : [ 'node_modules' ],
    extensions : [ '', '.js', '.jsx' ],
  },
  resolveLoader : {
    modulesDirectories : [ './node_modules' ],
  },
  module : {
    noParse : /\.min\.js/,
    loaders : [
      {
        test : /\.jsx|js$/,
        exclude : /node_modules/,
        loaders : [ 'react-hot', 'babel?stage=1' ],
      },
    ],
  },
};

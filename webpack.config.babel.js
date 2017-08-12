const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

const OUTPUT_PATH = path.resolve('dist');
const OUTPUT_FILENAME = 'js/[name]-bundle.js';

const BACKGROUND_ENTRY = path.resolve('src', 'js', 'background', 'index.js');
const OPTIONS_ENTRY = path.resolve('src', 'js', 'options', 'index.js');
const POPUP_ENTRY = path.resolve('src', 'js', 'popup', 'index.js');
const SASS_ENTRY = path.resolve('src', 'sass', 'main.scss');
const NODE_MODULES = path.resolve('node_modules');

let esRule = {
  test: /\.js$/,
  use: 'babel-loader',
  exclude: /node_modules/
};
let lintRule = {
  test: /\.js$/,
  use: 'eslint-loader',
  exclude: /node_modules/
};
let scssRule = {
  test: /\.(sass|scss)$/,
  use: extractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader']
  }),
  exclude: /node_modules/
};

const configuration = {
  entry: {
    'background': BACKGROUND_ENTRY,
    'options': OPTIONS_ENTRY,
    'popup': POPUP_ENTRY,
    'styles': SASS_ENTRY
  },
  output: {
    path: OUTPUT_PATH,
    filename: OUTPUT_FILENAME
  },
  plugins: [
    new extractTextPlugin({
      filename: 'css/[name]-bundle.css',
      allChunks: true
    })
  ],
  resolve: {
    modules: [NODE_MODULES]
  },
  module: {
    rules: [
      esRule,
      lintRule,
      scssRule
    ]
  }
};

module.exports = configuration;

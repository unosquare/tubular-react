var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'docs/');
var APP_DIR = path.resolve(__dirname, 'srcdocs/pages/');

var config = {
  entry: APP_DIR + '/Index.tsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {    
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader?configFileName=tsconfig.docs.json'},
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', 'jsx' ],
  },
};

module.exports = config;
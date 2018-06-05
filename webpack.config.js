const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DOCS_BUILD_DIR = path.resolve(__dirname, 'docs/');
const DOCS_APP_DIR = path.resolve(__dirname, 'srcdocs/pages/');

const BUILD_DIR = path.resolve(__dirname, 'dist/');
const APP_ENTRY = path.resolve(__dirname, 'src/');

const SAMPLE_DIR = path.resolve(__dirname, 'sample/app/');
const SAMPLE_ENTRY = path.resolve(__dirname, 'sample/src/');

const docsConfig = {
  entry: DOCS_APP_DIR + '/Index.tsx',
  output: {
    path: DOCS_BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {    
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: { configFileName: './tsconfigs/tsconfig.docs.json' } },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', 'jsx' ],
  }
};

const tubularReactConfig = {
  entry: {
    tubular: APP_ENTRY + '/index.ts'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
    library: 'tubular-react',
    libraryTarget: 'umd',
    publicPath: BUILD_DIR,
    umdNamedDefine: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
 },
  module : {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: { configFileName: './tsconfigs/tsconfig.tubular.json' } }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', 'jsx' ]
  },
  externals: {
    // Don't bundle react or react-dom
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './package.json', to: './' },
      { from: './README.md', to: './' },
      { from: './LICENSE', to: './' }
    ])
  ]
}

const sampleConfig = {
  entry: SAMPLE_ENTRY + '/app.tsx',
  output: {
    path: SAMPLE_DIR,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module : {    
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: { configFileName: './tsconfigs/tsconfig.sample.json' } },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', 'jsx' ],
  },
  devServer: { 
    contentBase: SAMPLE_DIR, 
    compress: true,  
    port: 9000 
  }
}

module.exports = env => {
  switch(env.NODE_ENV) {
    case 'docs':
      return docsConfig;
    break;
    case 'tubular-react':
      return tubularReactConfig;
    break;
    case 'sample':
      return sampleConfig;
    break;
    default:
      return 'Define a NODE_ENV variable like --env.NODE_ENV=xvariable';
    break;
  }
}
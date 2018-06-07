const path = require('path');
const DOCS_BUILD_DIR = path.resolve(__dirname, 'docs/');
const DOCS_APP_DIR = path.resolve(__dirname, 'srcdocs/pages/');

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
    case 'sample':
      return sampleConfig;
    break;
    default:
      return 'Define a NODE_ENV variable like --env.NODE_ENV=xvariable';
    break;
  }
}
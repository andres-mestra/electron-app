const path = require('path')
const Dotenv = require('dotenv-webpack')

const NODE_ENV = `${process.env.NODE_ENV}`
const pathEnv = NODE_ENV ? `.env.${NODE_ENV}` : '.env'

module.exports = {
  target: 'electron-main',
  devtool: 'source-map',
  mode: 'none',
  entry: {
    index: './main/index.ts',
    preload: './main/preload.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '.webpack', 'electron'),
    libraryTarget: 'commonjs2',
  },
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new Dotenv({
      path: pathEnv,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
}

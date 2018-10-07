const path = require('path')
const cleanwebpackplugin = require('clean-webpack-plugin')
const toolkit = require('./toolkit')

const config = {
  entry: toolkit.entries(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new cleanwebpackplugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: false,
      dry: false
    })
  ].concat(toolkit.pages()),
  resolve: {
    extensions: ['.js','.jsx', '.less'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'style': path.resolve(__dirname, '../src/components/style'),
      'layout': path.resolve(__dirname, '../src/components/layout')
    }
  }
}

module.exports = config
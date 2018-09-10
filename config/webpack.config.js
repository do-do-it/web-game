const path = require('path')
const webpack = require('webpack')
const htmlwebpackplugin = require('html-webpack-plugin')
const cleanwebpackplugin = require('clean-webpack-plugin')

const toolkit = require('./toolkit')

const config = {
  mode: 'development',
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
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new cleanwebpackplugin(path.resolve(__dirname, '../dist'))
  ].concat(toolkit.pages()),
  resolve: {
    extensions: ['.js','.jsx', '.less'],
    alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@style': path.resolve(__dirname, '../src/components/style'),
        '@layout': path.resolve(__dirname, '../src/components/layout'),
        '@libs': path.resolve(__dirname, '../src/libs')
    }
  }
}

module.exports = config
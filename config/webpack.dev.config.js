const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const config = merge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
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
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 8001,
    hot: true,
    host: 'localhost'
  }
})

module.exports = config
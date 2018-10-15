const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const env = require('./env')[process.env.NODE_ENV]

const config = merge(baseConfig, {
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
    port: env.port,
    hot: true,
    host: env.ip
  }
})

module.exports = config
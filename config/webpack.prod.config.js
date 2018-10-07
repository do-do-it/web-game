const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const os = require('os')

const config = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
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
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].css"
    }),
    new webpack.BannerPlugin({
      banner: `built by ${os.hostname()} at ${(new Date()).toLocaleString()}`
    })
  ]
})

module.exports = config
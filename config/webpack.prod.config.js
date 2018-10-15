const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const os = require('os')
const cleanwebpackplugin = require('clean-webpack-plugin')
const path = require('path')
const env = require('./env')[process.env.NODE_ENV]

const config = merge(baseConfig, {
  output: {
    filename: '[name].[contenthash:8].js',
    publicPath: env.publicPath
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
    new cleanwebpackplugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: false,
      dry: false
    }),
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
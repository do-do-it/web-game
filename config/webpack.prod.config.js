const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const os = require('os')
const cleanwebpackplugin = require('clean-webpack-plugin')
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = merge(baseConfig, {
  output: {
    filename: '[name].[contenthash:8].js'
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
            loader: 'css-loader',
            options: {
              minimize: true
            }
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
      chunkFilename: "[id].[contenthash:8].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new webpack.BannerPlugin({
      banner: `built by ${os.hostname()} at ${(new Date()).toLocaleString()}`
    })
  ]
})

module.exports = config
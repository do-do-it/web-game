const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const htmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const merge = require('webpack-merge')
const env = require('./env')[process.env.NODE_ENV]

const addWebpackHotMiddleware = entrys => {
  for (const key in entrys) {
    if (entrys.hasOwnProperty(key)) {
      entrys[key].unshift('webpack-hot-middleware/client')
    }
  }
  return entrys
}

baseConfig.entry = addWebpackHotMiddleware(baseConfig.entry)

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
    new htmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = config
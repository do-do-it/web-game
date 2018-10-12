const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

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
  ]
})

module.exports = config
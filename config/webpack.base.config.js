const path = require('path')
const cleanwebpackplugin = require('clean-webpack-plugin')
const entrys = require('./entrys')
const env = require('./env')[process.env.NODE_ENV]

const config = {
  mode: env.mode,
  entry: entrys.entries(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: env.publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|mp4|mp3)$/,
        exclude: /node_modules/,
        use: 'url-loader'
      }
    ]
  },
  plugins: entrys.pages(),
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
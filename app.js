const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./config/webpack.server.config')
const ejs = require('ejs')
const routerMiddleware = require('./mock/router')
const env = require('./config/env')[process.env.NODE_ENV]

const compiler = webpack(webpackConfig)
const app = new express()

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  lazy: false,
  stats: 'errors-only',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: false
  }
})).use(webpackHotMiddleware(compiler))

app.use(express.static('./'))
app.set('views', path.join(__dirname, './dist/'))
app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.use(routerMiddleware)

app.listen(env.port, () => {
  console.log(`the app is listen at ${env.ip}:${env.port}`)
})
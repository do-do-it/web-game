const Express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./config/webpack.server.config')

const compiler = webpack(webpackConfig)
const app = new Express()

app.use(webpackDevMiddleware(compiler, {
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: false
  }
})).use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
  res.send('Hello 2222222!')
})

// app.get('/my', (req, res) => {
//   res.send('Hello my!')
// })

app.listen(8001, () => {
  console.log('the app is listen at 8001')
})
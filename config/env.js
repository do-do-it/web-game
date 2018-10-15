const units = require('./units')
const port = '8001'
const ip = units.getIPAdress()

module.exports = {
  dev: {
    ip,
    port,
    mode: 'development',
    publicPath: `http://${ip}:${port}`
  },
  prod: {
    mode: 'production',
    publicPath: '/'
  }
}
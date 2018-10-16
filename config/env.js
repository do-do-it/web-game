const units = require('./units')
const port = '8001'
const ip = units.getIPAdress()

module.exports = {
  dev: {
    ip,
    port,
    mode: 'development',
    proxy: 'http://192.168.64.68:5555',
    publicPath: `http://${ip}:${port}`
  },
  prod: {
    mode: 'production',
    publicPath: '/'
  }
}
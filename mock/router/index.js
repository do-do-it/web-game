const path = require('path')
const fs = require('fs')
const router = require('express').Router()
const env = require('../../config/env')[process.env.NODE_ENV]
const httpProxymiddleware = require('http-proxy-middleware')

const routerFilter = (pathname, req) => {
  return !(pathname.match(/html|ico/) || pathname === '/')
}

const routers = (app, proxy) => {
  require('./demo/index')(router)
  
  if (proxy) {
    // 开启代理
    app.use(httpProxymiddleware(routerFilter, {
      target: env.proxy,
      changeOrigin: true
    }))
    router.all('*', (req, res, next) => {
      if (req.path === '/') {
        // 根目录
        res.send('welcome')
      } else if (req.path.indexOf('.html') !== -1) {
        // 静态html
        res.render(req.path.replace('/', ''))
      } else {
        
      }
    })
  } else {
    router.all('*', (req, res, next) => {
      if (req.path === '/') {
        // 根目录
        res.send('welcome')
      } else if (req.path.indexOf('.html') !== -1) {
        // 静态html
        res.render(req.path.replace('/', ''))
      } else {
        // api js json 默认值
        const api = req.path.replace('/', '')
        const apiJsPath = path.resolve(__dirname, '../api/', api + '.js')
        const apiJsonPath = path.resolve(__dirname, '../api/', api + '.json')
        if (fs.existsSync(apiJsPath)) {
          res.json(require('../api/' + api + '.js')())
        } else if (fs.existsSync(apiJsonPath)) {
          res.json(JSON.parse(fs.readFileSync(apiJsonPath)));
        } else {
          res.json({
            code: '000000',
            success: true,
            data: null
          })
        }
      }
    })
  }
  app.use(router)
}

module.exports = routers

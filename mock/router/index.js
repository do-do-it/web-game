const path = require('path')
const fs =require('fs')
const router = require('express').Router()

require('./demo/index')(router)

router.all('/', (req, res) => {
  res.send('welcome')
})

router.all('*', (req, res) => {
  if (req.path.indexOf('.html') !== -1) {
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

module.exports = router

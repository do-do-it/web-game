const path = require('path')
const fs = require('fs')
const htmlwebpackplugin = require('html-webpack-plugin')

const hasTemplate = (page) => {
  return fs.existsSync(path.resolve(__dirname, '../src/container/' + page + '/index.html'))
}

// 入口js
const entries = () => {
  const pages = fs.readdirSync(path.resolve(__dirname, '../src/container'))
  const entries = {}
  pages.forEach(item => {
    const key = item + '/index'
    entries[key] = [path.resolve(__dirname, '../src/container/' + key)]
  })
  return entries
}
// 入口html
const pages = () => {
  const pages = fs.readdirSync(path.resolve(__dirname, '../src/container'))
  const htmlPlugins = []
  pages.forEach(item => {
    const template = hasTemplate(item) ? path.resolve(__dirname, '../src/container/' + item + '/index.html') : path.resolve(__dirname, '../src/index.html')
    htmlPlugins.push(new htmlwebpackplugin({
      filename: path.resolve(__dirname, '../dist/', item + '/index.html'),
      chunks: [item + '/index'],
      alwaysWriteToDisk: true,
      template: `html-loader?attrs[]=img:src&attrs[]=img:data-src!ejs-html-loader!${template}`
    }))
  })
  return htmlPlugins
}

module.exports = {
  pages,
  entries
}
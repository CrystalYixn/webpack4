const express = require('express')
// 用本地服务启动 webpack, 本地服务与 webpack 在同一端口也可以解决跨域
const webpack = require('webpack')
const middle = require('webpack-dev-middleware')

const config = require('./webpack.config')
// 通过 webpack 处理 webpack 配置得到编译对象
const compilerConfig = webpack(config)
const app = express()
app.use(middle(compilerConfig))

app.get('/user', (req, res) => {
  res.json({ name: 'lxm' })
})
app.listen(3000, () => {
  console.log('服务已启动')
})
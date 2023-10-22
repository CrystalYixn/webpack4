// 异步串行
const { AsyncSeriesWaterfallHook } = require('tapable')
// import { AsyncSeriesWaterfallHook } from './other'
// 指定调用时的参数
const sh = new AsyncSeriesWaterfallHook(['name'])
// 注册事件
sh.tapPromise('node', (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('node', name)
      resolve('结果')
    }, 1500)
  })
})
sh.tapPromise('react', (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('react', data)
      resolve()
    }, 1500)
  })
})
sh.promise('whh').then(() => {
  console.log('async end')
})
// sh.tapAsync('node', (name, cb) => {
//   setTimeout(() => {
//     console.log('node', name)
//     cb(null, '结果')
//   }, 1500)
// })
// sh.tapAsync('react', (data, cb) => {
//   setTimeout(() => {
//     console.log('react', data)
//     cb(null)
//   }, 1500)
// })
// sh.callAsync('whh', () => {
//   console.log('async end')
// })

// btn.addEventListener('click', () => {
//   // jsonp 实现的动态导入
//   import('./other').then(data => {
//     console.log(123)
//   })
// })

// // 通过 import 语句, 即使全量导入 webpack 也能在 production 模式下进行摇树优化
// import other from './other'
// // es6 模块会把结果放在 default 上, require 等价与 import *
// // const other = require('./other')

// // scope hosting 作用域提升, 会简化一些简单的代码
// const a = 1
// const b = 2
// const c = a + b
// // 生产环境会被输出为 console.log("3====")
// console.log(c + '====')

// 手动单独引入某一个语言包, 配置中忽略引入其他包
// import 'moment/locale/zh-cn'

// 'development' true 2
// console.log(` ==================  ================= `, DEV, FLAG, EXPRESSION)

// 通过 import 或者 require 导入的文件才会被打包
// 返回的结果是一个打包后的图片地址
// import logo from './logo.png'

import $ from 'jquery'
// 写法 2, 让模块暴露在全局中导入
// import $ from 'expose-loader?$!jquery'
console.log(__dirname)
require('./index.css')
require('@babel/polyfill')

function * fn1() {
  yield 1
}
class Person {
  name = 'whh'
}
console.log($)
console.log(window.$)
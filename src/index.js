import $ from 'jquery'
import moment from 'moment'
// 手动单独引入某一个语言包, 配置中忽略引入其他包
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
const r = moment().endOf('day').fromNow()
console.log(r)

// 'development' true 2
// console.log(` ==================  ================= `, DEV, FLAG, EXPRESSION)

// 通过 import 或者 require 导入的文件才会被打包
// 返回的结果是一个打包后的图片地址
// import logo from './logo.png'

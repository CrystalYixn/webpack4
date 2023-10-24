const loaderUtils = require('loader-utils')

function loader(source) {
  return `
    const style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
  `
}
// 使用 JSON.stringify, style.innerHTML = ${JSON.stringify(source)}
// style.innerHTML = "body {\n  background: red;\n }

// 直接输出, style.innerHTML = ${source}, 加上双引号也不行, 双引号不支持换行
// style.innerHTML = body {
//  background: red;
// }

// QAA 不加上这个 pitch-loader 有什么影响呢?
// 不加 pitch-loader 时, 由于 css-loader 返回的是 js 代码, 会直接插入到 style 标签中
// 不加时只打包出两个模块 index.js 与 index.less
// 加上后打包多出 logo.png 与
// ./loader/css-loader.js!./loader/less-loader.js!./src/index.less 共 4 个模块
// 只有两个模块是因为 require 在 innerHTML 字符串中, 没有被识别为导入模块

// QAA webpack 打包出来有多少模块是由什么决定的
// 从主入口开始递归遍历, 文件里只要有 require() 就会产生一个模块

// 剩余需要调用的 loader 绝对路径与模块路径拼接的 url
loader.pitch = function(remainingRequests) {
  // 将绝对路径转换为相对路径
  // loaderUtils.stringifyRequest(this, '!!' + remainingRequests) -->
  // "!!../loader/css-loader.js!../loader/less-loader.js!./index.less"
  // 此路径还会被 webpack 的 parse 流程再转换一次, 因为发射路径不等于编译路径
  const res = `
    const style = document.createElement('style')
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequests)})
    document.head.appendChild(style)
  `
  return res
}

module.exports = loader

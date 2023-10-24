// 处理 css 文件中引用的其他文件, 默认情况只是一个字符串
// 引用的文件不会被 webpack 发射, 导致运行时找不到文件
// css-loader 本质就是把 url(xxx) 替换为 url(require(xxx))
// 经过 compiler parse 后, 再变为 __webpack_require__(xxx), 这样就收集了依赖
function loader(source) {
  const reg = /url\((.+?)\)/g
  let pos = 0
  let current
  const arr = ['let list = []']
  while (current = reg.exec(source)) {
    // ['url(./logo.png)', './logo.png']
    const [matched, capturedGroup] = current
    const startIndex = reg.lastIndex - matched.length
    // 保存匹配内容前面的部分
    arr.push(`list.push(${JSON.stringify(source.slice(pos, startIndex))})`)
    // 替换匹配部分
    // QAA 为什么这里的 require 导入内容中间没有引号?
    // capturedGroup 本身就是个字符串, 通过模板字符串生成后带有引号
    arr.push(`list.push('url(' + require(${capturedGroup}) + ')')`)
    pos = reg.lastIndex
  }
  // 从最后一个匹配结果末尾开始截取剩余部分
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
  arr.push(`module.exports = list.join('')`)
  return arr.join('\r\n')
}
module.exports = loader

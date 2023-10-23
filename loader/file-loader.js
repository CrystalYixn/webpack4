const loaderUtils = require('loader-utils')

function loader(source) {
  // 生成哈希图片路径
  const filename = loaderUtils.interpolateName(
    this, '[hash].[ext]', { content: source }
  )
  this.emitFile(filename, source)
  // 处理文件后生成的模块为导出一个文件路径字符串
  return `module.exports = "${filename}"`
}
// source 不以字符串模式返回, 以 buffer 返回
loader.raw = true

module.exports = loader
const loaderUtils = require('loader-utils')
const mime = require('mime')

function loader(source) {
  const { limit } = loaderUtils.getOptions(this)
  if (limit > source.length) {
    // 导出一个 data: 字符串, 注意双引号位置在赋值号后面, 注意因为是字符串所以不能换行
    return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  } else {
    return require('./file-loader').call(this, source)
  }
}
loader.raw = true

module.exports = loader

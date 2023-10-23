const babel = require('@babel/core')
const loaderUtils = require('loader-utils')

function loader(source) {
  const options = loaderUtils.getOptions(this)
  // 同步时 return 会自动调用, 异步时手动调用
  const cb = this.async()
  babel.transform(source, {
    ...options,
    sourceMaps: true,
    // 不指定此属性会导致 sourceMap 中文件名显示 unknown, 当前处理文件的绝对路径
    filename: this.resourcePath.split('/').pop(),
  }, (err, result) => {
    cb(null, result.code, result.map)
  })
}

module.exports = loader
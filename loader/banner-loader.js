const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')
const fs = require('fs')

function loader(source) {
  const options = loaderUtils.getOptions(this)
  const cb = this.async()
  const schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      filename: {
        type: 'string',
      }
    },
  }
  validateOptions(schema, options, 'banner-loader')
  if (options.filename) {
    // 告诉 webpack 将此文件加入依赖, watch 模式下文件变化重新编译
    this.addDependency(options.filename)
    fs.readFile(options.filename, 'utf-8', (err, data) => {
      cb(err, `/**${data}**/${source}`)
    })
  } else {
    cb(null, `/**${options.text}**/${source}`)
  }
}

module.exports = loader
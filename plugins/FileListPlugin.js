class FileListPlugin {
  constructor({ filename }) {
    this.filename = filename
  }

  apply(compiler) {
    // 发射钩子
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
      const { assets } = compilation
      let content = `## 文件名    资源大小\r\n`
      Object.entries(assets).forEach(([filename, fileInfo]) => {
        content += `- ${filename}    ${fileInfo.size()}\r\n`
      })
      // 如果往 assets 上增加属性, 则也会被发射
      assets[this.filename] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
      setTimeout(() => {
        // 等待一秒后才继续发射
        cb()
      }, 1000);
    })
  }
}

module.exports = FileListPlugin

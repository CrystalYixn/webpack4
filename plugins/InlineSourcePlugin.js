const HtmlWebpackPlugin = require('html-webpack-plugin')

class InlineSourcePlugin {
  constructor({ match }) {
    this.reg = match
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      // HtmlWebpackPlugin 的钩子基于 compilation, 在修改标签资源组时回调的钩子
      HtmlWebpackPlugin.getHooks(compilation)
        .alterAssetTagGroups.tapAsync('alterPlugin', (data, cb) => {
          data = this.processTags(data, compilation)
          cb(null, data)
        })
    })
  }

  processTags(data, compilation) {
    let headTags = []
    let bodyTags = []
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation))
    })
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation))
    })
    return {
      ...data,
      headTags,
      bodyTags,
    }
  }

  processTag(tag, compilation) {
    let newTag, url
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style'
      }
      url = tag.attributes.href
    }
    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script'
      }
      url = tag.attributes.src
    }
    if (url) {
      console.log(Object.keys(compilation.assets))
      console.log(` ================== url ================= `, url)
      newTag.innerHTML = compilation.assets[url].source()
      delete compilation.assets[url]
      return newTag
    }
    return tag
  }
}

module.exports = InlineSourcePlugin
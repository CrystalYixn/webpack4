// 导入给行内 loader, loader 顺序 pre -> normal -> inline -> post
// const str = require('inline-loader!./a.js')
// -! 让此文件导入给行内 loader 后不再 pre/normal loader 处理
// !! 除行内外所有都不处理
// ! 没有 normal 处理
// const str = require('-!inline-loader!./a.js')
// loader 实际分为两部分组成 pitch, normal, 先从左到右调用 pitch
// 如果 pitch 没有返回值, 则获取资源后再调用 normal 部分, 即
// loader3 -> loader2 -> loader1 -> resource -> loader1 -> loader2 -> loader3
// 如果 pitch 有返回值, 则直接跳过剩下的 pitch 与未经过 pitch 的 normal(包括当前 normal)
// loader3 -> loader2(有返回值) -> loader3
// pitch 一般用于

require('./index.less')

// 任何模块都是一段 js 脚本代码, 导出字符串或执行了某些能力
// loader 就是将导入文件变为 js 代码

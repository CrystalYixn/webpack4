function loader(source) {
  return `
    const style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)
  `
}
module.exports = loader

// 使用 JSON.stringify, style.innerHTML = ${JSON.stringify(source)}
// style.innerHTML = "body {\n  background: red;\n }

// 直接输出, style.innerHTML = ${source}, 加上双引号也不行, 双引号不支持换行
// style.innerHTML = body {
//  background: red;
// }

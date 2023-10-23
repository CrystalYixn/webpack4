const less = require('less')
function loader(source) {
  less.render(source, (err, c) => {
    source = c.css
  })
  // 之前需要加这个是因为自己实现的 webpack 是利用
  // eval(`style.innerHTML = "body {\\n  background-color: red;\\n}"`) 执行的
  // 因为在两层字符串中, 所以需要两个 \\ 转译, eval 执行后就变成了 \n
  // 一层字符串解构一层转义符
  // source = source.replace(/\n/g, '\\n')
  return source
}
module.exports = loader

const less = require('less')
function loader(source) {
  less.render(source, (err, c) => {
    source = c.css
  })
  source = source.replace(/\n/g, '\\n')
  return source
}
module.exports = loader

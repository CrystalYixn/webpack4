const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')

// npm run build -- --config webpack.prod.js
module.exports = smart(base, {
  mode: 'production'
})
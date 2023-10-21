// npm run build -- --config webpack.config.react.js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    // 单独打包第三方模块, 使得项目中依赖编译时不重新打包
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    // 作为一个库输出
    // 让打包后的结果赋值到一个变量名上, 如 var ab = webpack 打包后的输出
    // library: 'ab',
    library: '_dll_[name]',
    // 输出为 cjs 用法, 变为 exports['ab'] = ...
    // libraryTarget: 'commonjs',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      // 指定已打包过的模块清单
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ],
}
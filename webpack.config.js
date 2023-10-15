const path = require('path')
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    // path.resolve 将一个路径转换为绝对路径, __dirname 当前执行文件的绝对路径
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
  },
}
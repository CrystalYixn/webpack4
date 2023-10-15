const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.[hash:8].js',
    // path.resolve 将一个路径转换为绝对路径, __dirname 当前执行文件的绝对路径
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './build',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, use: [
        'style-loader', // 插入到 html 文件的 head 标签中
        {
          loader: 'css-loader', // 解析 css 文件
          options: {
            insertAt: 'top'
          }, // 这种写法可以传递参数
        }
      ]}
    ]
  }
}
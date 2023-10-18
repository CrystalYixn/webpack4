const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, use: [
        MiniCssExtractPlugin.loader, // 创建 link 标签并插入
        'css-loader', // 解析 css 文件
        'postcss-loader',
      ]}
    ],
    rules: [
      { test: /\.js$/, use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }}
    ],
  }
}
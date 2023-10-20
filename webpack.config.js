const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
module.exports = {
  entry: {
    home: './src/index.js',
    other: './src/other.js',
  },
  mode: 'production',
  output: {
    filename: '[name].[hash:8].js',
    // path.resolve 将一个路径转换为绝对路径, __dirname 当前执行文件的绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 在所有路径前追加公共路径, 一般为 CDN
    // publicPath: 'https://360buyaodian.com/',
  },
  devtool: 'source-map',
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
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'other.html',
      hash: true,
      chunks: ['other'],
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    // new webpack.ProvidePlugin({
    //   // 写法 3, 在每个模块中注入 $, 不注入到全局
    //   $: 'jquery'
    // }),
  ],
  externals: {
    jquery: "$" // 防止 import 此模块时进行打包
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 200kb 直接被打包为 base64
            limit: 200 * 1024,
            // 指定输出路径, 引用处会自动加上路径
            // outputPath: 'img/',
            // 单独配置路径
            // publicPath: 'https://360buyaodian.com/',
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader',
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: "pre", // webpack 默认倒序执行, pre 强制最先执行
      //     },
      //   },
      //   exclude: /mode_modules/,
      // },
      // loader 分类:pre 前置, normal, post 后置, 内联
      // 写法 1, 全局安装模块
      // {
      //   // 引用 jquery 时访问全局环境
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$',
      // },
      {
        test: /\.js$/, use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          },
        },
        exclude: /mode_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 创建 link 标签并插入
          'css-loader', // 解析 css 文件, 会将 url() 中的链接替换为 require(xxx)
          'postcss-loader'
        ]
      },
    ],
  }
}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const ClearWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: {
    home: './src/index.js',
    // other: './src/other.js',
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
  resolve: {
    // 强制只在当前目录下查找依赖包
    modules: [path.resolve('node_modules')],
    // 指定第三方包的入口字段, 修改默认导入 import 'bootstrap'
    mainFields: ['style', 'main'],
    // 按照顺序依次尝试解析后缀查找文件
    extensions: ['.js', '.css', '.json', '.vue'],
    // 指定入口文件的名字, 默认 index.js
    // mainFiles: [],
    // alias: {
    //   // 默认 import 'bootstrap' 导入的是包配置里的 main 字段指向的 js 文件
    //   bootstrap: 'bootstrap/dist/css/bootstrap.css',
    // }
  },
  // // 每次保存时自动重新打包
  // watch: true,
  // watchOptions: {
  //   // 每秒检查 1000 次
  //   poll: 1000,
  //   // 输入防抖
  //   aggregateTimeout: 500,
  //   ignored: /node_modules/
  // },
  // 配置内部服务器
  devServer: {
    // 内部的 express 服务器钩子, 可以用来 mock 数据
    // before(app) {
    //   app.get('/user', (req, res) => {
    //     res.json({ name: 'whh' })
    //   })
    // },
    // proxy: {
    //   // 转发 /api 开头的请求
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       // 将 api 重写为空, 前端请求 /api/getUser -> 转发后 /getUser
    //       '/api': ''
    //     },
    //   }
    // },
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
    // 每次打包前先清空上一次的文件夹
    new ClearWebpackPlugin('./dist'),
    // 拷贝静态文件到打包构建文件夹中
    new CopyWebpackPlugin([
      { from: './doc', to: './' },
    ]),
    // 替换代码
    new webpack.DefinePlugin({
      // 会将匹配到的 key 直接替换字符串
      DEV: '"development"',
      FLAG: 'true',
      EXPRESSION: '1+1',
    }),
    // 忽略指定引用, 不必加载全部语言包, 通过手动引入语言包缩减体积
    new webpack.IgnorePlugin(/\.\/local/),
    // 版权声明, 插入到打包文件的头部
    new webpack.BannerPlugin('make 2023 by honi'),
    // new webpack.ProvidePlugin({
    //   // 写法 3, 在每个模块中注入 $, 不注入到全局
    //   $: 'jquery'
    // }),
  ],
  externals: {
    jquery: "$" // 防止 import 此模块时进行打包
  },
  module: {
    // 不去解析 jquery 中的依赖关系
    noParse: /jquery/,
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
        exclude: /mode_modules/,
        // 与 exclude 选其一即可
        // include: path.resolve('src'),
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
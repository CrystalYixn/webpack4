const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const ClearWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Happypack = require('happypack')
module.exports = {
  optimization: {
    // 单页应用不需要抽离公共部分
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial',
          minSize: 0,
          // 当前被引用多少次才抽离
          minChunks: 2,
        },
        // 配置第三方包的抽离
        vendor: {
          // 先单独抽离第三方模块, 否则第三方包和自己的公用模块会被抽离到一个文件中
          priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
      },
    }
  },
  entry: {
    home: './src/index.js',
    // 多入口会导致 hot 热更新失效
    // other: './src/other.js',
  },
  output: {
    filename: '[name].[hash:8].js',
    // path.resolve 将一个路径转换为绝对路径, __dirname 当前执行文件的绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 在所有路径前追加公共路径, 一般为 CDN
    // publicPath: 'https://360buyaodian.com/',
  },
  // 解析 loader 的配置
  resolveLoader: {
    // 配置查找路径
    modules: [path.resolve(__dirname, 'loader'), 'node_modules']
    // alias: {
    //   loader1: path.resolve(__dirname, 'loader', 'loader1.js')
    // }
  },
  // devtool: 'source-map',
  // 解析模块的配置
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
    port: 3000,
    hot: true,
    // progress: true,
    // devServer 查找本地资源的路径
    contentBase: './dist',
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
      // 如果 home 模块依赖其他 deferred 模块则不会立即执行
      // 等到其他依赖模块加载完成后才会执行
      // chunks: ['home'],
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    // 每次打包前先清空上一次的文件夹
    new ClearWebpackPlugin('./dist'),
    // 拷贝静态文件到打包构建文件夹中
    // new CopyWebpackPlugin([
    //   { from: './doc', to: './' },
    // ]),
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
    // new Happypack({
    //   id: 'js',
    //   use: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         presets: ['@babel/preset-env', '@babel/preset-react'],
    //         plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'],
    //       },
    //     },
    //   ]
    // }),
    new Happypack({
      id: 'css',
      use: [
        MiniCssExtractPlugin.loader, // 创建 link 标签并插入
        'css-loader', // 解析 css 文件, 会将 url() 中的链接替换为 require(xxx)
        'postcss-loader'
      ]
    }),
    // 打印更新的模块路径
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 当导入时, 尝试查找是否有对应的动态链接库, 没有时再打包此依赖
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, 'dist', 'manifest.json'),
    // }),
    // new webpack.ProvidePlugin({
    //   // 写法 3, 在每个模块中注入 $, 不注入到全局
    //   $: 'jquery'
    // }),
  ],
  // externals: {
  //   jquery: "$" // 防止 import 此模块时进行打包
  // },
  module: {
    // 不去解析 jquery 中的依赖关系
    noParse: /jquery/,
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          // 负责发射文件, 生成处理文件路径
          // loader: 'file-loader',
          // 对文件进行大小、生成等限制, 最后还是会交给 file-loader 处理
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
        test: /\.js$/,
        // use: 'Happypack/loader?id=js',
        include: path.resolve('src'),
        exclude: /node_modules/,
        use: {
          loader: 'banner-loader',
          options: {
            text: 'make by honi',
            filename: path.resolve(__dirname, 'banner.js'),
          }
        },
        // 与 exclude 选其一即可
        // include: path.resolve('src'),
      },
      {
        test: /\.css$/,
        // use: 'Happypack/loader?id=css',
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader','css-loader' , 'less-loader'],
      },
    ],
  }
}
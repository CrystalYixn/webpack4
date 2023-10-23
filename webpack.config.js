const path = require('path')

class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('emit', () => {
      console.log('发射文件')
    })
  }
}

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, 'loader', 'style-loader'),
          path.resolve(__dirname, 'loader', 'less-loader'),
        ]
      }
    ],
    plugins: [
      new MyPlugin()
    ],
  }
}
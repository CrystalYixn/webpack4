;(function (modules) {
  // webpackBootstrap
  // The module cache
  var installedModules = {}

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    })

    // Execute the module function
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )

    // Flag the module as loaded
    module.l = true

    // Return the exports of the module
    return module.exports
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules

  // expose the module cache
  __webpack_require__.c = installedModules

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter })
    }
  }

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value)
    if (mode & 8) return value
    if (mode & 4 && typeof value === 'object' && value && value.__esModule)
      return value
    var ns = Object.create(null)
    __webpack_require__.r(ns)
    Object.defineProperty(ns, 'default', { enumerable: true, value: value })
    if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key]
          }.bind(null, key)
        )
    return ns
  }

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default']
          }
        : function getModuleExports() {
            return module
          }
    __webpack_require__.d(getter, 'a', getter)
    return getter
  }

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }

  // __webpack_public_path__
  __webpack_require__.p = ''

  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'))
})(
	// 自执行函数参数, { [id: string]: () => void }
  {
    /***/ './src/a.js':
      /*!******************!*\
  !*** ./src/a.js ***!
  \******************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        eval(
          'const b = __webpack_require__(/*! ./b */ "./src/b.js")\r\nmodule.exports = \'a\' + b\n\n//# sourceURL=webpack:///./src/a.js?'
        )

        /***/
      },

    /***/ './src/b.js':
      /*!******************!*\
  !*** ./src/b.js ***!
  \******************/
      /*! no static exports found */
      /***/ function (module, exports) {
        eval("module.exports = 'b'\n\n//# sourceURL=webpack:///./src/b.js?")

        /***/
      },

    /***/ './src/index.js':
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        eval(
          "const str = __webpack_require__(/*! ./a.js */ \"./src/a.js\")\r\nconsole.log(str)\r\n\r\n// btn.addEventListener('click', () => {\r\n//   // jsonp 实现的动态导入\r\n//   import('./other').then(data => {\r\n//     console.log(123)\r\n//   })\r\n// })\r\n\r\n// // 通过 import 语句, 即使全量导入 webpack 也能在 production 模式下进行摇树优化\r\n// import other from './other'\r\n// // es6 模块会把结果放在 default 上, require 等价与 import *\r\n// // const other = require('./other')\r\n\r\n// // scope hosting 作用域提升, 会简化一些简单的代码\r\n// const a = 1\r\n// const b = 2\r\n// const c = a + b\r\n// // 生产环境会被输出为 console.log(\"3====\")\r\n// console.log(c + '====')\r\n\r\n// 手动单独引入某一个语言包, 配置中忽略引入其他包\r\n// import 'moment/locale/zh-cn'\r\n\r\n// 'development' true 2\r\n// console.log(` ==================  ================= `, DEV, FLAG, EXPRESSION)\r\n\r\n// 通过 import 或者 require 导入的文件才会被打包\r\n// 返回的结果是一个打包后的图片地址\r\n// import logo from './logo.png'\r\n\n\n//# sourceURL=webpack:///./src/index.js?"
        )

        /***/
      },
  }
)

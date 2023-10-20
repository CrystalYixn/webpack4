fetch('/user')
  .then(res => res.json())
  .then(res => {
    console.log(res)
  })

// 通过 import 或者 require 导入的文件才会被打包
// 返回的结果是一个打包后的图片地址
// import logo from './logo.png'

// const image = new Image()
// image.src = logo
// document.body.appendChild(image)

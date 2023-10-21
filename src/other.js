export default {
  sum(a, b) {
    return a + b + 'sum'
  },
  minus(a, b) {
    return b - a + 'minus'
  }
}

// 两者导出等价
// export const a = 6
// const a = 6
// export { a }

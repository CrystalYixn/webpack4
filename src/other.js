export class SyncHook {
  constructor(argsStatement) {
    this.cbs = []
  }
  tap(name, cb) {
    this.cbs.push(cb)
  }
  call(...args) {
    this.cbs.forEach(cb => cb(...args))
  }
}

// 两者导出等价
// export const a = 6
// const a = 6
// export { a }

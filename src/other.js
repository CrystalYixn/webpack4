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

export class SyncBailHook extends SyncHook {
  constructor(argsStatement) {
    super()
  }
  call(...args) {
    for (const cb of this.cbs) {
      const res = cb(...args)
      if (res) {
        break
      }
    }
  }
}

export class SyncWaterfallHook extends SyncHook {
  constructor(argsStatement) {
    super()
  }
  call(...args) {
    const [first, ...others] = this.cbs
    let res = first(...args)
    others.reduce((pre, fn) => {
      return fn(pre)
    }, res)
  }
}

export class SyncLoopHook extends SyncHook {
  constructor(argsStatement) {
    super()
  }
  call(...args) {
    let index = 0
    while(index < this.cbs.length) {
      const cb = this.cbs[index]
      if (cb(...args) === undefined) index++
    }
  }
}

// 两者导出等价
// export const a = 6
// const a = 6
// export { a }

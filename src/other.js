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

export class AsyncParallelHook extends SyncHook {
  constructor(argsStatement) {
    super()
  }
  tapAsync(name, cb) {
    this.cbs.push(cb)
  }
  tapPromise(name, cb) {
    this.cbs.push(cb)
  }
  callAsync(...args) {
    const callback = args.pop()
    let count = 0
    this.cbs.forEach(fn => fn(...args, () => {
      if (++count >= length) {
        callback()
      }
    }))
  }
  promise(...args) {
    return Promise.all(this.cbs.map(cb => cb(...args)))
  }
}

export class AsyncSeriesHook extends SyncHook {
  constructor(argsStatement) {
    super()
  }

  tapAsync(name, cb) {
    this.cbs.push(cb)
  }

  tapPromise(name, cb) {
    this.cbs.push(cb)
  }

  callAsync(...args) {
    const callback = args.pop()
    const maxLength = this.cbs.length
    let index = 0
    const next = () => {
      const cb = this.cbs[index]
      if (index++ >= maxLength) {
        return callback()
      }
      cb(...args, next)
    }
    next()
  }

  // 找到不可分割的部分, cb 无法被分割, 只能改调用 cb 的时机
  promise(...args) {
    const [first, ...others] = this.cbs
    // 需要知道 Promise.then 是可以叠加的, 叠加就可以利用 reduce
    return others.reduce((p, n) => p.then(() => n(...args)), first(...args))
    // const maxLength = this.cbs.length
    // let index = 0
    
    // return new Promise((resolve) => {
    //   const next = () => {
    //     const cb = this.cbs[index]
    //     if (index++ >= maxLength) {
    //       return resolve()
    //     }
    //     // QA 没有 return 时这里为什么会报 undefined?
    //     cb(...args).then(next)
    //   }
    //   next()
    // })
  }
}

export class AsyncSeriesWaterfallHook extends SyncHook {
  constructor(argsStatement) {
    super()
  }

  tapAsync(name, cb) {
    this.cbs.push(cb)
  }

  tapPromise(name, cb) {
    this.cbs.push(cb)
  }

  callAsync(...args) {
    const callback = args.pop()
    const maxLength = this.cbs.length
    let index = 0
    const next = (error, ...args) => {
      const cb = this.cbs[index]
      if (index++ >= maxLength || error) {
        return callback()
      }
      cb(...args, next)
    }
    next(null, ...args)
  }

  // 找到不可分割的部分, cb 无法被分割, 只能改调用 cb 的时机
  promise(...args) {
    const [first, ...others] = this.cbs
    // 需要知道 Promise.then 是可以叠加的, 叠加就可以利用 reduce
    return others.reduce((p, n) => p.then((...args) => n(...args)), first(...args))
  }
}

// 两者导出等价
// export const a = 6
// const a = 6
// export { a }

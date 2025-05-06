import { IS_SET } from '../check/is-set.util.js'

export const TRIM_DATA = (_: { object: any, depth?: number }): any => {
  const o: any = _.object
  const depth = _.depth ?? Number.MAX_SAFE_INTEGER

  let res: any

  if (IS_SET(o)) {
    if (Array.isArray(o)) {
      res = o.map((row: any) => TRIM_DATA({ object: row, depth: depth - 1 }))
    } else if ((o !== null) && (typeof o === 'object')) {
      for (const k in o) {
        const kOfO = k as keyof typeof o

        if (IS_SET(o[kOfO])) {
          if (!IS_SET(res)) {
            res = {}
          }

          res[k] = o[kOfO]

          if (Array.isArray(res[k])) {
            res[k] = res[k].map((row: any) => TRIM_DATA({ object: row, depth: depth - 1 }))
          } else if (typeof res[k] === 'object') {
            if (res[k] instanceof Date) {
              res[k] = res[k].toISOString()
            } else {
              res[k] = TRIM_DATA({ object: res[k], depth: depth - 1 })
            }
          }
        }
      }
    } else {
      res = o
    }
  }

  return res
}

import { IS_SET } from '../check/is-set.util.js'

/** create a new instance of an object where `undefined` or `null` attributes are not kept, recursively */
export const TRIM_OBJECT = (_: { object: any, depth?: number }): any => {
  const res: any = {}

  const o: any = _.object
  const depth: number = _.depth ?? Number.MAX_SAFE_INTEGER

  if (IS_SET(o) && (depth > 0)) {
    for (const k in o) {
      if (IS_SET(o[k])) {
        if (Array.isArray(o[k])) {
          res[k] = o[k].map((row: any) => TRIM_OBJECT({ object: row, depth: depth - 1 }))
        } else if (typeof o[k] === 'object') {
          res[k] = TRIM_OBJECT({ object: o[k], depth: depth - 1 })
        } else {
          res[k] = o[k]
        }
      }
    }
  }

  return res
}

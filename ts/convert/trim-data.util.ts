import { IS_SET } from '../check/is-set.util.js'

/**
 * Removes `null`/`undefined` properties recursively and turns `Date` values into ISO strings.
 * `depth` is the number of levels to trim (an array counts as a level); below it values are returned as-is.
 * @param _ - The value and the depth
 * @param _.object - The value to trim
 * @param _.depth - The number of levels to trim, optional: all levels when missing
 * @returns The trimmed copy; `undefined` for a null or undefined input, an object left with no property, or a Date at the root
 * @example
 * ```typescript
 * TRIM_DATA({ object: { a: 1, b: null, c: undefined, d: { e: null, f: 2 } } }) // returns { a: 1, d: { f: 2 } }
 * TRIM_DATA({ object: { d: new Date(0) } }) // returns { d: '1970-01-01T00:00:00.000Z' }
 * TRIM_DATA({ object: { a: { b: null } }, depth: 1 }) // returns { a: { b: null } }
 * TRIM_DATA({ object: [{ a: 1, b: null }, null] }) // returns [{ a: 1 }, undefined]
 * TRIM_DATA({ object: { a: null } }) // returns undefined
 * TRIM_DATA({ object: null }) // returns undefined
 * ```
 */
export function TRIM_DATA (_: { object: any, depth?: number }): any {
  const o: any = _.object
  const depth = _.depth ?? Number.MAX_SAFE_INTEGER

  let res: any

  if (IS_SET(o)) {
    if (depth <= 0) {
      res = o
    } else if (Array.isArray(o)) {
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

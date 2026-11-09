import { IS_SET } from '../check/is-set.util.js'

/**
 * Creates a new instance of an object where `undefined` or `null` attributes are not kept, recursively
 * @param _ - The object and the depth
 * @param _.object - The object to trim
 * @param _.depth - How many levels of nested objects and arrays are trimmed (defaults to unlimited)
 * @returns A trimmed copy of the object; `{}` when `object` is `null` or `undefined`
 * @example
 * ```typescript
 * TRIM_OBJECT({ object: { a: 1, b: null, c: undefined } }) // returns { a: 1 }
 * TRIM_OBJECT({ object: { a: { b: null, c: 2 }, d: [{ e: undefined, f: 1 }] } }) // returns { a: { c: 2 }, d: [{ f: 1 }] }
 * TRIM_OBJECT({ object: { a: { b: null } }, depth: 1 }) // returns { a: {} }
 * TRIM_OBJECT({ object: null }) // returns {}
 * ```
 */
export function TRIM_OBJECT (_: { object: any, depth?: number }): any {
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

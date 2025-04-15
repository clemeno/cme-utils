import { IS_SET } from 'check/is-set.util.js'

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

/**
 * More accurately typed than the `.keys` method on any `object` instance
 * @returns the list of keys of an object as an array of any type a key can be
 */
export const GET_OBJECT_KEY_LIST = <T = any> (o: T): Array<keyof T> => Object.keys(o as any) as any

/**
 * Accurately typed result of `.entries`
 * @returns the list of entries of an `Array` as an array of pair of [key, value]
 */
export type OBJECT_ENTRY_LIST_TYPE<T = any> = Array<{ [K in keyof T]: [K, T[K]] }[keyof T]>

/**
 * More accurately typed than the `.entries` method on any `object` instance
 * @param o the object to get the entries from
 * @returns the list of entries of an `object` as an array of pair of [key, value]
 */
export const GET_OBJECT_ENTRY_LIST = <T = any> (o: T): OBJECT_ENTRY_LIST_TYPE<T> => Object.entries(o as any) as any

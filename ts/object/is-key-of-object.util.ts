import type { numeric } from '../numeric.js'

/**
 * CHECK (is a `key` `of` `object` instance)
 * @param _ - The key and the object
 * @param _.key - The key to look for, compared as a string
 * @param _.of - The object to look in
 * @returns `true` when `key` is one of the own enumerable keys of `of`; `false` when `of` is `null` or `undefined`
 * @example
 * ```typescript
 * IS_KEY_OF_OBJECT({ key: 'a', of: { a: 1 } }) // returns true
 * IS_KEY_OF_OBJECT({ key: 0, of: ['x'] }) // returns true
 * IS_KEY_OF_OBJECT({ key: 'b', of: { a: 1 } }) // returns false
 * IS_KEY_OF_OBJECT({ key: 'a', of: null }) // returns false
 * IS_KEY_OF_OBJECT({ key: 'a' }) // returns false
 * ```
 */
export function IS_KEY_OF_OBJECT (_: { key: numeric, of?: any }): boolean {
  return (typeof _.of !== 'undefined') && (_.of !== null) && Object.keys(_.of as Record<string, any>).includes(`${_.key}`)
}

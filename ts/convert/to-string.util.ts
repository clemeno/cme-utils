import { IS_A_FUNCTION } from '../check/is-a-function.util.js'
import { IS_SET } from '../check/is-set.util.js'

/**
 * Converts any value into a string: strings and Buffers as text, objects and arrays as JSON, other values with `toString()`.
 * @param _ - The value to convert
 * @returns The string, empty for null, undefined and NaN
 * @example
 * ```typescript
 * TO_STRING(42) // returns '42'
 * TO_STRING(true) // returns 'true'
 * TO_STRING({ a: 1 }) // returns '{"a":1}'
 * TO_STRING([1, 2]) // returns '[1,2]'
 * TO_STRING(null) // returns ''
 * TO_STRING(NaN) // returns ''
 * ```
 */
export function TO_STRING (_: any): string {
  let res = ''

  if (IS_SET(_) && !Number.isNaN(_)) {
    // a Buffer knows itself through its class, so a polyfill (absent from globalThis) counts too
    const bBuffer = (typeof _.constructor?.isBuffer === 'function') && _.constructor.isBuffer(_) === true

    if (typeof _ === 'string') {
      res = _
    } else if (bBuffer) {
      res = _.toString()
    } else if (typeof _ === 'object') {
      res = JSON.stringify(_)
    } else if (IS_A_FUNCTION((_).toString)) {
      res = (_).toString()
    }
  }

  return res
}

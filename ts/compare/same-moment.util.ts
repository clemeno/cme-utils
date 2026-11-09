import { IS_SET } from '../check/is-set.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * Checks that two moments are the same, with moment = numeric (timestamp) | Date | DateTime ...
 * @param _ - The two moments to compare
 * @param _.a - The first moment
 * @param _.b - The second moment
 * @returns `true` when both convert to the same number, `false` otherwise (also when one is null or undefined, or both)
 * @example
 * ```typescript
 * SAME_MOMENT({ a: 1000, b: new Date(1000) }) // returns true
 * SAME_MOMENT({ a: 1000, b: 2000 }) // returns false
 * SAME_MOMENT({ a: null, b: null }) // returns false
 * ```
 */
export function SAME_MOMENT (_: { a: any, b: any }): boolean {
  const a = IS_SET(_.a) ? TO_NUMBER(_.a) : NaN
  const b = IS_SET(_.b) ? TO_NUMBER(_.b) : NaN
  return a === b
}

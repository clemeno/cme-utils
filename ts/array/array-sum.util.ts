import { IS_NUMERIC } from '../number/is-numeric.util.js'
import { IS_SET } from '../check/is-set.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import type { numeric } from '../numeric.js'

/**
 * Sums the numeric values of an array, ignoring the non-numeric ones.
 * @param a - The array of numbers or numeric strings to sum
 * @returns The sum, or NaN if the array is empty or holds no numeric value
 * @example
 * ```typescript
 * ARRAY_SUM([1, 2, 3]) // returns 6
 * ARRAY_SUM([1, 'a', '3']) // returns 4
 * ARRAY_SUM([]) // returns NaN
 * ```
 */
export function ARRAY_SUM (a: numeric[]): number {
  let sum: number | undefined

  for (const v of a) {
    if (IS_NUMERIC(v)) {
      const nv = TO_NUMBER(v)

      if (!IS_SET(sum)) {
        sum = nv
      } else {
        sum += nv
      }
    }
  }

  return sum ?? NaN
}

import { IS_NUMERIC } from '../number/is-numeric.util.js'
import type { numeric } from '../numeric.js'
import { ARRAY_SUM } from './array-sum.util.js'

/**
 * Computes the average of the numeric values of an array, ignoring the non-numeric ones.
 * @param a - The array of numbers or numeric strings to average
 * @returns The average, or NaN if the array is empty or holds no numeric value
 * @example
 * ```typescript
 * ARRAY_AVERAGE([1, 2, 3, 4]) // returns 2.5
 * ARRAY_AVERAGE([1, 'a', 3]) // returns 2
 * ARRAY_AVERAGE([]) // returns NaN
 * ```
 */
export function ARRAY_AVERAGE (a: numeric[]): number {
  const validLength = a.filter(v => IS_NUMERIC(v)).length
  return (0 < validLength) ? (ARRAY_SUM(a) / validLength) : NaN
}

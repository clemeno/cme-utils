import { IS_SET } from '../check/is-set.util.js'

/**
 * Finds the maximum value in an array, ignoring null and undefined values.
 * Uses standard comparison operators (<) for ordering.
 * @template T - The type of array elements
 * @param a - The array to search for the maximum value
 * @returns The maximum value, or undefined if array is empty or contains only null/undefined
 * @example
 * ```typescript
 * ARRAY_MAX([1, 5, 3, 9, 2]) // returns 9
 * ARRAY_MAX(['apple', 'zebra', 'banana']) // returns 'zebra'
 * ARRAY_MAX([null, 42, undefined]) // returns 42
 * ARRAY_MAX([]) // returns undefined
 * ```
 */
export const ARRAY_MAX = <T = any> (a: T[] | readonly T[]): T | undefined => {
  let max: any

  for (const v of a) {
    if (IS_SET(v)) {
      if (!IS_SET(max) || (max < v)) {
        max = v
      }
    }
  }

  return max
}

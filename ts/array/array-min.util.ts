import { IS_SET } from '../check/is-set.util.js'

/**
 * Finds the minimum value in an array, ignoring null and undefined values.
 * @param a - The array to search for the minimum value
 * @returns The minimum value, or undefined if array is empty or contains only null/undefined
 * @example
 * ```typescript
 * ARRAY_MIN([5, 1, 9, 3]) // returns 1
 * ARRAY_MIN([null, 42, undefined]) // returns 42
 * ARRAY_MIN([]) // returns undefined
 * ```
 */
export function ARRAY_MIN<T = any> (a: T[]): T | undefined {
  let min: any

  for (const v of a) {
    if (IS_SET(v)) {
      if (!IS_SET(min) || (min > v)) {
        min = v
      }
    }
  }

  return min
}

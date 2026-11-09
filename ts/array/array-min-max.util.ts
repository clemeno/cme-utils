import { IS_SET } from '../check/is-set.util.js'

/**
 * Finds the minimum and maximum values in an array in one pass, ignoring null and undefined values.
 * @param a - The array to search
 * @returns An object with `min` and `max`, both undefined if array is empty or contains only null/undefined
 * @example
 * ```typescript
 * ARRAY_MIN_MAX([5, 1, 9, 3]) // returns { min: 1, max: 9 }
 * ARRAY_MIN_MAX([null, 42, undefined]) // returns { min: 42, max: 42 }
 * ARRAY_MIN_MAX([]) // returns { min: undefined, max: undefined }
 * ```
 */
export function ARRAY_MIN_MAX<T = any> (a: T[]): { min: T | undefined, max: T | undefined } {
  let min: T | undefined
  let max: T | undefined

  for (const element of a) {
    if (IS_SET(element)) {
      if (!IS_SET(min) || (element < min)) {
        min = element
      }

      if (!IS_SET(max) || (max < element)) {
        max = element
      }
    }
  }

  return { min, max }
}

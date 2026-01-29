import { IS_ON } from '../check/is-on.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import type { numeric } from '../numeric.js'

/**
 * Calculates the median value of a numeric array.
 * Sorts a copy of the array and finds the middle value(s).
 * @param arr - Array of numeric values
 * @returns The median value, or NaN if array is empty
 * @example
 * ```typescript
 * ARRAY_MEDIAN([1, 3, 5, 7, 9]) // returns 5 (odd length)
 * ARRAY_MEDIAN([1, 3, 5, 7]) // returns 4 (even length: (3+5)/2)
 * ARRAY_MEDIAN([]) // returns NaN
 * ```
 */
export const ARRAY_MEDIAN = (arr: numeric[]): number => {
  let res = NaN

  const count = arr.length

  if (0 < count) {
    // Sort a copy of the array, convert to numbers
    // eslint-disable-next-line max-params
    const sortedNList = arr.slice().map(TO_NUMBER).sort((a, b) => a - b)

    const indexM = Math.floor(count / 2)

    // Odd length: middle element; Even length: average of two middle elements
    res = IS_ON(count % 2) ? sortedNList[indexM] : ((+sortedNList[indexM] + +sortedNList[indexM + 1]) / 2)
  }

  return res
}

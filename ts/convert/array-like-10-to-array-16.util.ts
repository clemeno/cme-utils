import { FROM_BASE_10_TO_16 } from './from-base-10-to-16.util.js'
import { TO_ANY_ARRAY } from './to-any-array.util.js'
import { TO_STRING } from './to-string.util.js'

/**
 * Converts each decimal item of an array-like into a hexadecimal string.
 * @param b - An array or iterable of decimal numbers or numeric strings
 * @returns The list of hexadecimal strings, an empty list when the input is not iterable
 * @example
 * ```typescript
 * ARRAY_LIKE_10_TO_ARRAY_16([10, 255, '16']) // returns ['a', 'ff', '10']
 * ARRAY_LIKE_10_TO_ARRAY_16([]) // returns []
 * ARRAY_LIKE_10_TO_ARRAY_16(null) // returns []
 * ```
 */
export function ARRAY_LIKE_10_TO_ARRAY_16 (b: any): string[] {
  return TO_ANY_ARRAY(b).map(v => FROM_BASE_10_TO_16(TO_STRING(v)))
}

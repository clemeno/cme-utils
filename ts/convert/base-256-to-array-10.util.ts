import { SYMBOLS_BASE_256 } from '../constant/symbols-base-256.util.js'
import { PARSE_INT_FROM_CUSTOM_BASE } from './parse-int-from-custom-base.util.js'
import { TO_ANY_ARRAY } from './to-any-array.util.js'

/**
 * Converts a base 256 string (one symbol per byte, see SYMBOLS_BASE_256) into the list of its decimal values.
 * @param s - The base 256 string
 * @returns The decimal value of each symbol, an empty list for an empty string
 * @example
 * ```typescript
 * BASE_256_TO_ARRAY_10(BYTE_ARRAY_LIKE_TO_BASE_256([0, 1, 255])) // returns [0, 1, 255]
 * BASE_256_TO_ARRAY_10('') // returns []
 * ```
 */
export function BASE_256_TO_ARRAY_10 (s: string): number[] {
  const base = SYMBOLS_BASE_256

  return TO_ANY_ARRAY(s).map((input: string) => PARSE_INT_FROM_CUSTOM_BASE({ input, base }))
}

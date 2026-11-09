import { BASE_256_TO_ARRAY_10 } from './base-256-to-array-10.util.js'
import { FROM_BASE_10_TO_16 } from './from-base-10-to-16.util.js'

/**
 * Converts a base 256 string (one symbol per byte, see SYMBOLS_BASE_256) into the list of its hexadecimal values.
 * @param s - The base 256 string
 * @returns The hexadecimal string of each symbol, an empty list for an empty string
 * @example
 * ```typescript
 * BASE_256_TO_ARRAY_16(BYTE_ARRAY_LIKE_TO_BASE_256([0, 1, 255])) // returns ['0', '1', 'ff']
 * BASE_256_TO_ARRAY_16('') // returns []
 * ```
 */
export function BASE_256_TO_ARRAY_16 (s: string): string[] {
  return BASE_256_TO_ARRAY_10(s).map(FROM_BASE_10_TO_16)
}

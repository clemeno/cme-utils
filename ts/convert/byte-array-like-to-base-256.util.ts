import { BASE_CONVERT_BBSN } from './base-convert-bbsn.util.js'
import { TO_ANY_ARRAY } from './to-any-array.util.js'
import { TO_STRING } from './to-string.util.js'

/**
 * Converts an array-like of bytes (0..255) into a base 256 string, one symbol per byte (see SYMBOLS_BASE_256).
 * @param o - An array or iterable of decimal byte values
 * @returns The base 256 string, empty for an empty input
 * @example
 * ```typescript
 * BASE_256_TO_ARRAY_10(BYTE_ARRAY_LIKE_TO_BASE_256([0, 1, 255])) // returns [0, 1, 255]
 * BYTE_ARRAY_LIKE_TO_BASE_256([]) // returns ''
 * ```
 */
export function BYTE_ARRAY_LIKE_TO_BASE_256 (o: any): string {
  return TO_ANY_ARRAY(o).map(v => BASE_CONVERT_BBSN({ n: TO_STRING(v), from: 10, to: 256 })).join('')
}

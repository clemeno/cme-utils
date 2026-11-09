import type { numeric } from '../numeric.js'
import { BIG_10_TO_BIG_16 } from './big-10-to-big-16.util.js'

/**
 * Converts a big decimal integer into a hexadecimal string (see BIG_10_TO_BIG_16).
 * @param _ - The decimal integer, as a string or a number
 * @returns The lowercase hexadecimal string, or an empty string when the input is not made of digits
 * @example
 * ```typescript
 * FROM_BASE_10_TO_16('255') // returns 'ff'
 * FROM_BASE_10_TO_16(0) // returns '0'
 * FROM_BASE_10_TO_16('x') // returns ''
 * ```
 */
export function FROM_BASE_10_TO_16 (_: numeric): string {
  return BIG_10_TO_BIG_16(_)
}

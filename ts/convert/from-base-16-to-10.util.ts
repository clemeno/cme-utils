import type { numeric } from '../numeric.js'
import { BIG_16_TO_BIG_10 } from './big-16-to-big-10.util.js'

/**
 * Converts a big hexadecimal integer into a decimal string (see BIG_16_TO_BIG_10).
 * @param _ - The hexadecimal integer, as a string or a number
 * @returns The decimal string, or an empty string when the input is empty or not set
 * @example
 * ```typescript
 * FROM_BASE_16_TO_10('ff') // returns '255'
 * FROM_BASE_16_TO_10('') // returns ''
 * ```
 */
export function FROM_BASE_16_TO_10 (_: numeric): string {
  return BIG_16_TO_BIG_10(_)
}

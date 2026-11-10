import { IS_SET } from '../check/is-set.util.js'
import type { numeric } from '../numeric.js'
import { BIG_ADD_10 } from './big-add-10.util.js'

/**
 * Converts a big hexadecimal integer (any length) into a decimal string, without losing precision.
 * @param _s - The hexadecimal integer, as a string or a number
 * @returns The decimal string, or an empty string when the input is empty or not set
 * @example
 * ```typescript
 * BIG_16_TO_BIG_10('ff') // returns '255'
 * BIG_16_TO_BIG_10('10000000000000000') // returns '18446744073709551616'
 * BIG_16_TO_BIG_10('') // returns ''
 * BIG_16_TO_BIG_10(null) // returns ''
 * ```
 */
export function BIG_16_TO_BIG_10 (_s: numeric | null | undefined): string {
  let dec = '0'

  const input = (IS_SET(_s) && ((typeof _s === 'number') ? !isNaN(_s) : (_s !== 'NaN'))) ? `${_s}` : ''

  for (const c of input.split('')) {
    const n = Number.parseInt(c, 16)

    for (let t = 8; t !== 0; t >>= 1) {
      dec = BIG_ADD_10({ x: dec, y: dec })

      if ((n & t) !== 0) {
        dec = BIG_ADD_10({ x: dec, y: '1' })
      }
    }
  }

  return (input !== '') ? dec : ''
}

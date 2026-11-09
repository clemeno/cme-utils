import { IS_SET } from '../check/is-set.util.js'
import type { numeric } from '../numeric.js'
import { TO_NUMBER } from './to-number.util.js'

/**
 * Converts a big decimal integer (digits only, any length) into a hexadecimal string, without losing precision.
 * @param _s - The decimal integer, as a string or a number
 * @returns The lowercase hexadecimal string, or an empty string when the input is not made of digits
 * @example
 * ```typescript
 * BIG_10_TO_BIG_16('255') // returns 'ff'
 * BIG_10_TO_BIG_16('18446744073709551616') // returns '10000000000000000'
 * BIG_10_TO_BIG_16('0') // returns '0'
 * BIG_10_TO_BIG_16('abc') // returns ''
 * BIG_10_TO_BIG_16(null) // returns ''
 * ```
 */
export function BIG_10_TO_BIG_16 (_s: numeric): string {
  const hex: Array<string | undefined> = []

  const sStr = (IS_SET(_s) && (((typeof _s === 'number') && !isNaN(_s)) || (_s !== 'NaN'))) ? `${_s}` : ''

  if (/^0+$/.test(sStr)) {
    hex.push('0')
  } else if (/^\d+$/.test(sStr)) {
    // digits only: any other character converts to NaN, which never reaches 0 and loops forever
    const dec = sStr.split('')
    const sum: number[] = []
    let i: number
    let s: number

    while (dec.length !== 0) {
      s = TO_NUMBER(dec.shift() ?? 0)
      for (i = 0; (s !== 0) || i < sum.length; i += 1) {
        s += ((sum[i] ?? 0)) * 10
        sum[i] = s % 16
        s = (s - sum[i]) / 16
      }
    }

    while (sum.length !== 0) {
      hex.push(sum.pop()?.toString(16))
    }
  }

  return hex.join('')
}

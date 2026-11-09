import { IS_NUMERIC } from '../number/is-numeric.util.js'
import { IS_A_BIGINT } from '../check/is-a-bigint.util.js'

/**
 * Converts a bigint, an integer number or an integer string (decimal or `0x` hex) to a bigint.
 * @param v - The value to convert
 * @returns The bigint, or null for a float, a blank or non-numeric string, null, undefined, NaN or any other type
 * @example
 * ```typescript
 * TO_BIGINT_OR_NULL('42') // returns 42n
 * TO_BIGINT_OR_NULL(12) // returns 12n
 * TO_BIGINT_OR_NULL('0xff') // returns 255n
 * TO_BIGINT_OR_NULL(1.5) // returns null
 * TO_BIGINT_OR_NULL('') // returns null
 * TO_BIGINT_OR_NULL(undefined) // returns null
 * ```
 */
export function TO_BIGINT_OR_NULL (v: any): bigint | null {
  let res: bigint | null = null

  if (IS_A_BIGINT(v)) {
    res = v
  } else if ((typeof v === 'string') ? (v.trim() !== '') : IS_NUMERIC(v)) {
    // a non-blank string goes to BigInt's own exact parser, which takes '0xff' and rejects '1.5'
    try { res = BigInt(v) } catch { }
  }

  return res
}

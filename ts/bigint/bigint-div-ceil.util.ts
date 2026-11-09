import { BIGINT_DIV } from './bigint-div.util.js'

/**
 * Performs integer division on two bigints, returning the quotient ceiled to the nearest integer.
 *
 * @param _ - An object containing the **dividend** and **divisor** as bigints.
 * @param _.dividend - The number to divide
 * @param _.divisor - The number to divide by
 * @returns The quotient of the division, ceiled to the nearest integer.
 * @example
 * ```typescript
 * BIGINT_DIV_CEIL({ dividend: 7n, divisor: 2n }) // returns 4n
 * BIGINT_DIV_CEIL({ dividend: -7n, divisor: 2n }) // returns -3n
 * BIGINT_DIV_CEIL({ dividend: 1n, divisor: 3n }) // returns 1n
 * BIGINT_DIV_CEIL({ dividend: 6n, divisor: 3n }) // returns 2n
 * BIGINT_DIV_CEIL({ dividend: 7n, divisor: 0n }) // throws RangeError
 * ```
 */
export function BIGINT_DIV_CEIL (_: { dividend: bigint, divisor: bigint }): bigint {
  const { q, r } = BIGINT_DIV(_)

  // q is truncated toward zero: it is one too low when the exact quotient is positive and not whole,
  // i.e. when the remainder (signed like the dividend) and the divisor have the same sign
  const bTruncatedDown = (r !== 0n) && ((r < 0n) === (_.divisor < 0n))

  return q + (bTruncatedDown ? 1n : 0n)
}

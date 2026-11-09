import { BIGINT_DIV } from './bigint-div.util.js'

/**
 * Performs integer division on two bigints, returning the quotient floored to the nearest integer.
 *
 * @param _ - An object containing the **dividend** and **divisor** as bigints.
 * @param _.dividend - The number to divide
 * @param _.divisor - The number to divide by
 * @returns The quotient of the division, floored to the nearest integer.
 * @example
 * ```typescript
 * BIGINT_DIV_FLOOR({ dividend: 7n, divisor: 2n }) // returns 3n
 * BIGINT_DIV_FLOOR({ dividend: -7n, divisor: 2n }) // returns -4n
 * BIGINT_DIV_FLOOR({ dividend: -1n, divisor: 3n }) // returns -1n
 * BIGINT_DIV_FLOOR({ dividend: 6n, divisor: 3n }) // returns 2n
 * BIGINT_DIV_FLOOR({ dividend: 7n, divisor: 0n }) // throws RangeError
 * ```
 */
export function BIGINT_DIV_FLOOR (_: { dividend: bigint, divisor: bigint }): bigint {
  const { q, r } = BIGINT_DIV(_)

  // q is truncated toward zero: it is one too high when the exact quotient is negative and not whole,
  // i.e. when the remainder (signed like the dividend) and the divisor have opposite signs
  const bTruncatedUp = (r !== 0n) && ((r < 0n) !== (_.divisor < 0n))

  return q - (bTruncatedUp ? 1n : 0n)
}

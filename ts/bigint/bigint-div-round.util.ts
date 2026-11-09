import { BIGINT_DIV } from './bigint-div.util.js'

/**
 * Performs integer division on two bigints, returning the quotient rounded to the nearest integer.
 *
 * @param _ - An object containing the **dividend** and **divisor** as bigints.
 * @param _.dividend - The number to divide
 * @param _.divisor - The number to divide by
 * @returns The quotient of the division, rounded to the nearest integer.
 * @example
 * ```typescript
 * BIGINT_DIV_ROUND({ dividend: 24n, divisor: 10n }) // returns 2n
 * BIGINT_DIV_ROUND({ dividend: 25n, divisor: 10n }) // returns 3n
 * BIGINT_DIV_ROUND({ dividend: 0n, divisor: 10n }) // returns 0n
 * BIGINT_DIV_ROUND({ dividend: 7n, divisor: 0n }) // throws RangeError
 * ```
 */
export function BIGINT_DIV_ROUND (_: { dividend: bigint, divisor: bigint }): bigint {
  const { q, r } = BIGINT_DIV(_)

  return q + (r < (_.divisor / 2n) ? 0n : 1n)
}

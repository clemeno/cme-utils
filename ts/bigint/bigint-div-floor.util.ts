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
 * BIGINT_DIV_FLOOR({ dividend: 6n, divisor: 3n }) // returns 2n
 * BIGINT_DIV_FLOOR({ dividend: 7n, divisor: 0n }) // throws RangeError
 * ```
 */
export function BIGINT_DIV_FLOOR (_: { dividend: bigint, divisor: bigint }): bigint {
  const { q, r } = BIGINT_DIV(_)

  const bQNegative = q < 0n

  return q + ((bQNegative && (r !== 0n)) ? -1n : 0n)
}

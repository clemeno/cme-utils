import { BIGINT_DIV } from './bigint-div.util.js'

/**
 * Performs integer division on two bigints, returning the integer quotient.
 *
 * @param _ - An object containing the **dividend** and **divisor** as bigints.
 * @param _.dividend - The number to divide
 * @param _.divisor - The number to divide by
 * @returns The integer quotient of the division.
 * @example
 * ```typescript
 * BIGINT_DIV_TRUNC({ dividend: 7n, divisor: 2n }) // returns 3n
 * BIGINT_DIV_TRUNC({ dividend: -7n, divisor: 2n }) // returns -3n
 * BIGINT_DIV_TRUNC({ dividend: 7n, divisor: 0n }) // throws RangeError
 * ```
 */
export function BIGINT_DIV_TRUNC (_: { dividend: bigint, divisor: bigint }): bigint {
  return BIGINT_DIV(_).q
}

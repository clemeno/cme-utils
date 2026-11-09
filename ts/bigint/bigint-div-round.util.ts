import { BIGINT_DIV_FLOOR } from './bigint-div-floor.util.js'

/**
 * Performs integer division on two bigints, returning the quotient rounded to the nearest integer.
 * A half rounds toward +infinity, like `Math.round`.
 *
 * @param _ - An object containing the **dividend** and **divisor** as bigints.
 * @param _.dividend - The number to divide
 * @param _.divisor - The number to divide by
 * @returns The quotient of the division, rounded to the nearest integer.
 * @example
 * ```typescript
 * BIGINT_DIV_ROUND({ dividend: 24n, divisor: 10n }) // returns 2n
 * BIGINT_DIV_ROUND({ dividend: 25n, divisor: 10n }) // returns 3n
 * BIGINT_DIV_ROUND({ dividend: -25n, divisor: 10n }) // returns -2n
 * BIGINT_DIV_ROUND({ dividend: 1n, divisor: 3n }) // returns 0n
 * BIGINT_DIV_ROUND({ dividend: 0n, divisor: 10n }) // returns 0n
 * BIGINT_DIV_ROUND({ dividend: 7n, divisor: 0n }) // throws RangeError
 * ```
 */
export function BIGINT_DIV_ROUND (_: { dividend: bigint, divisor: bigint }): bigint {
  // round(a / b) = floor(a / b + 1 / 2) = floor((2a + b) / 2b)
  return BIGINT_DIV_FLOOR({ dividend: (2n * _.dividend) + _.divisor, divisor: 2n * _.divisor })
}

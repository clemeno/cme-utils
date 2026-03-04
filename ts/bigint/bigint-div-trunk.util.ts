import { BIGINT_DIV } from './bigint-div.util.js'

/**
 * Performs integer division on two bigints, returning the integer quotient.
 *
 * @param _ An object containing the **dividend** and **divisor** as bigints.
 * @returns The integer quotient of the division.
 */
export function BIGINT_DIV_TRUNC (_: { dividend: bigint, divisor: bigint }): bigint {
  return BIGINT_DIV(_).q
}

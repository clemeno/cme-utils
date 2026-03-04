import { BIGINT_DIV } from './bigint-div.util.js'

/**
 * Performs integer division on two bigints, returning the quotient rounded to the nearest integer.
 *
 * @param _ An object containing the **dividend** and **divisor** as bigints.
 * @returns The quotient of the division, rounded to the nearest integer.
 */
export function BIGINT_DIV_ROUND (_: { dividend: bigint, divisor: bigint }): bigint {
  const { q, r } = BIGINT_DIV(_)

  return q + (r < (_.divisor / 2n) ? 0n : 1n)
}

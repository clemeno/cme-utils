import { BIGINT_DIV } from './bigint-div.util.js'

/**
 * Performs integer division on two bigints, returning the quotient ceiled to the nearest integer.
 *
 * @param _ An object containing the **dividend** and **divisor** as bigints.
 * @returns The quotient of the division, ceiled to the nearest integer.
 */
export function BIGINT_DIV_CEIL (_: { dividend: bigint, divisor: bigint }): bigint {
  const { q, r } = BIGINT_DIV(_)

  const bQPositive = 0n < q

  return q + ((bQPositive && (r !== 0n)) ? 1n : 0n)
}

import { BIGINT_DIV } from './bigint-div.util.js'

/**
 * Performs integer division on two bigints, returning the quotient floored to the nearest integer.
 *
 * @param _ An object containing the **dividend** and **divisor** as bigints.
 * @returns The quotient of the division, floored to the nearest integer.
 */
export function BIGINT_DIV_FLOOR (_: { dividend: bigint, divisor: bigint }): bigint {
  const { q, r } = BIGINT_DIV(_)

  const bQNegative = q < 0n

  return q + ((bQNegative && (r !== 0n)) ? -1n : 0n)
}

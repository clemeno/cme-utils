/**
 * Performs integer division on two bigints, returning both the quotient and the remainder.
 *
 * @param _ - An object containing the **dividend** and **divisor** as bigints.
 * @param _.dividend - The number to divide
 * @param _.divisor - The number to divide by
 * @returns An object containing the quotient (q) and the remainder (r).
 * @example
 * ```typescript
 * BIGINT_DIV({ dividend: 7n, divisor: 2n }) // returns { q: 3n, r: 1n }
 * BIGINT_DIV({ dividend: -7n, divisor: 2n }) // returns { q: -3n, r: -1n }
 * BIGINT_DIV({ dividend: 7n, divisor: 0n }) // throws RangeError
 * ```
 */
export function BIGINT_DIV (_: { dividend: bigint, divisor: bigint }): { q: bigint, r: bigint } {
  const dd = _.dividend
  const ds = _.divisor

  const r = dd % ds
  const q = (dd - r) / ds

  return { q, r }
}

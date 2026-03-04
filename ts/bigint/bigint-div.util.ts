/**
 * Performs integer division on two bigints, returning both the quotient and the remainder.
 *
 * @param _ An object containing the **dividend** and **divisor** as bigints.
 * @returns An object containing the quotient (q) and the remainder (r).
 */
export function BIGINT_DIV (_: { dividend: bigint, divisor: bigint }): { q: bigint, r: bigint } {
  const dd = _.dividend
  const ds = _.divisor

  const r = dd % ds
  const q = (dd - r) / ds

  return { q, r }
}

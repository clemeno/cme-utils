/**
 * ! **Not secure**, simple random number generator.
 * Random integer between `a` and `b`, both bounds included, in any order (decimals are truncated first).
 * @description use `crypto.getRandomValues` instead for secure random number generation
 * @param _ - The bounds
 * @param _.a - One bound
 * @param _.b - The other bound, which may be lower than `a`
 * @returns A random integer `n` with `min(a, b) <= n <= max(a, b)`
 * @example
 * ```typescript
 * GET_RANDOM_INT_BETWEEN({ a: 1, b: 6 }) // returns a random integer from 1 to 6
 * GET_RANDOM_INT_BETWEEN({ a: 6, b: 1 }) // returns a random integer from 1 to 6
 * GET_RANDOM_INT_BETWEEN({ a: 3.9, b: 3.2 }) // returns 3
 * GET_RANDOM_INT_BETWEEN({ a: -2, b: -2 }) // returns -2
 * ```
 */
export function GET_RANDOM_INT_BETWEEN (_: { a: number, b: number }): number {
  const a = Math.trunc(_.a)
  const b = Math.trunc(_.b)

  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

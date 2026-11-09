/**
 * ! **Not secure**, simple random number generator.
 * Random integer between `a` and `b`, both bounds included, in any order (decimals are truncated first).
 * @description use `crypto.getRandomValues` instead for secure random number generation
 */
export function GET_RANDOM_INT_BETWEEN (_: { a: number, b: number }): number {
  const a = Math.trunc(_.a)
  const b = Math.trunc(_.b)

  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

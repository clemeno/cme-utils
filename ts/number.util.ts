/**
 * ! **Not secure**, simple random number generator.
 * @description use `crypto.getRandomValues` instead for secure random number generation
 */
export const GET_RANDOM_INT_BETWEEN = (_: { a: number, b: number }): number => {
  const a = Math.trunc(_.a)
  const b = Math.trunc(_.b)

  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return Math.floor(Math.random() * Math.max(1, max - min)) + min
}

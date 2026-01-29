import { IS_SET } from '../check/is-set.util.js'

/** CHECK (moment a === moment b), with moment = numeric (timestamp) | Date | DateTime ... */
export const SAME_MOMENT = (_: { a: any, b: any }): boolean => {
  const a = IS_SET(_.a) ? +_.a : NaN
  const b = IS_SET(_.b) ? +_.b : NaN
  return a === b
}

import { IS_SET } from '../check/is-set.util.js'

/** CHECK (moment a === moment b), with moment = numeric (timestamp) | Date | DateTime ... */
export const SAME_MOMENT = <T = any> (_: { a: T, b: T }): boolean => (IS_SET(_.a) ? +_.a : null) === (IS_SET(_.b) ? +_.b : null)

import { SAME_MOMENT } from './same-moment.util.js'

/**
 * Checks that two datetimes are the same moment, with datetime = numeric (timestamp) | Date | DateTime ...
 * Alias of SAME_MOMENT.
 * @param _ - The two datetimes to compare
 * @param _.a - The first datetime
 * @param _.b - The second datetime
 * @returns `true` when both convert to the same number, `false` otherwise (also when one is null or undefined)
 * @example
 * ```typescript
 * SAME_DATETIME({ a: new Date(5), b: 5 }) // returns true
 * SAME_DATETIME({ a: 1, b: 2 }) // returns false
 * SAME_DATETIME({ a: null, b: undefined }) // returns false
 * ```
 */
export const SAME_DATETIME = SAME_MOMENT

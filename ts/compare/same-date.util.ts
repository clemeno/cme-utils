import { SAME_MOMENT } from './same-moment.util.js'

/**
 * Checks that two dates are the same moment, with date = numeric (timestamp) | Date | DateTime ...
 * Alias of SAME_MOMENT.
 * @param _ - The two dates to compare
 * @param _.a - The first date
 * @param _.b - The second date
 * @returns `true` when both convert to the same number, `false` otherwise (also when one is null or undefined)
 * @example
 * ```typescript
 * SAME_DATE({ a: new Date(5), b: 5 }) // returns true
 * SAME_DATE({ a: 1, b: 2 }) // returns false
 * SAME_DATE({ a: null, b: undefined }) // returns false
 * ```
 */
export const SAME_DATE = SAME_MOMENT

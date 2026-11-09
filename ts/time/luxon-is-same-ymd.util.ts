import { LUXON_IS_SAME_YM } from './luxon-is-same-ym.util.js'

/**
 * `Luxon` `DateTime` both occured during the same day
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The moments to compare
 * @param _.ma - The first `DateTime`
 * @param _.mb - The second `DateTime`
 * @returns `true` when both moments have the same year, month and day
 * @example
 * ```typescript
 * const ma = DateTime.fromISO('2024-03-15T14:30:45.123Z')
 * LUXON_IS_SAME_YMD({ ma, mb: DateTime.fromISO('2024-03-15T14:31:00Z') }) // returns true
 * LUXON_IS_SAME_YMD({ ma, mb: DateTime.fromISO('2024-03-16T14:30:45.123Z') }) // returns false
 * ```
 */
export function LUXON_IS_SAME_YMD<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return ((_.ma as any).day === (_.mb as any).day) && LUXON_IS_SAME_YM(_)
}

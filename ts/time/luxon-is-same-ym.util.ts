import { LUXON_IS_SAME_Y } from './luxon-is-same-y.util.js'

/**
 * `Luxon` `DateTime` both occured during the same month
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The moments to compare
 * @param _.ma - The first `DateTime`
 * @param _.mb - The second `DateTime`
 * @returns `true` when both moments have the same year and month
 * @example
 * ```typescript
 * const ma = DateTime.fromISO('2024-03-15T14:30:45.123Z')
 * LUXON_IS_SAME_YM({ ma, mb: DateTime.fromISO('2024-03-20T08:00:00Z') }) // returns true
 * LUXON_IS_SAME_YM({ ma, mb: DateTime.fromISO('2025-03-15T14:30:45.123Z') }) // returns false
 * ```
 */
export function LUXON_IS_SAME_YM<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return ((_.ma as any).month === (_.mb as any).month) && LUXON_IS_SAME_Y(_)
}

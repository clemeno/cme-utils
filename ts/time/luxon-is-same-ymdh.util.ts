import { LUXON_IS_SAME_YMD } from './luxon-is-same-ymd.util.js'

/**
 * `Luxon` `DateTime` both occured during the same hour
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The moments to compare
 * @param _.ma - The first `DateTime`
 * @param _.mb - The second `DateTime`
 * @returns `true` when both moments have the same year, month, day and hour
 * @example
 * ```typescript
 * const ma = DateTime.fromISO('2024-03-15T14:30:45.123Z')
 * LUXON_IS_SAME_YMDH({ ma, mb: DateTime.fromISO('2024-03-15T14:59:00Z') }) // returns true
 * LUXON_IS_SAME_YMDH({ ma, mb: DateTime.fromISO('2024-03-15T15:00:00Z') }) // returns false
 * ```
 */
export function LUXON_IS_SAME_YMDH<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return ((_.ma as any).hour === (_.mb as any).hour) && LUXON_IS_SAME_YMD(_)
}

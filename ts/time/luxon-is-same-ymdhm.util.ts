import { LUXON_IS_SAME_YMDH } from './luxon-is-same-ymdh.util.js'

/**
 * `Luxon` `DateTime` both occured during the same minute
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The moments to compare
 * @param _.ma - The first `DateTime`
 * @param _.mb - The second `DateTime`
 * @returns `true` when both moments have the same year, month, day, hour and minute
 * @example
 * ```typescript
 * const ma = DateTime.fromISO('2024-03-15T14:30:45.123Z')
 * LUXON_IS_SAME_YMDHM({ ma, mb: DateTime.fromISO('2024-03-15T14:30:10Z') }) // returns true
 * LUXON_IS_SAME_YMDHM({ ma, mb: DateTime.fromISO('2024-03-15T14:31:00Z') }) // returns false
 * ```
 */
export function LUXON_IS_SAME_YMDHM<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return ((_.ma as any).minute === (_.mb as any).minute) && LUXON_IS_SAME_YMDH(_)
}

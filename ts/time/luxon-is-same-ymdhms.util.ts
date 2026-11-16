import { LUXON_IS_SAME_YMDHM } from './luxon-is-same-ymdhm.util.js'

/**
 * `Luxon` `DateTime` both occured during the same second
 * * provide DateTime -> import { DateTime } from 'luxon'
 * * compares the wall-clock fields of each moment in its own zone: the same instant in two zones can differ, and two instants can match at a DST fold; to compare instants, `setZone` both moments to one zone first, or use `LUXON_IS_SAME` (to the millisecond)
 * @param _ - The moments to compare
 * @param _.ma - The first `DateTime`
 * @param _.mb - The second `DateTime`
 * @returns `true` when both moments have the same year, month, day, hour, minute and second
 * @example
 * ```typescript
 * const ma = DateTime.fromISO('2024-03-15T14:30:45.123Z', { zone: 'UTC' })
 * LUXON_IS_SAME_YMDHMS({ ma, mb: DateTime.fromISO('2024-03-15T14:30:45.900Z', { zone: 'UTC' }) }) // returns true
 * LUXON_IS_SAME_YMDHMS({ ma, mb: DateTime.fromISO('2024-03-15T14:30:46Z', { zone: 'UTC' }) }) // returns false
 * LUXON_IS_SAME_YMDHMS({ ma, mb: ma.setZone('Europe/Paris') }) // returns false
 * ```
 */
export function LUXON_IS_SAME_YMDHMS<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return ((_.ma as any).second === (_.mb as any).second) && LUXON_IS_SAME_YMDHM(_)
}

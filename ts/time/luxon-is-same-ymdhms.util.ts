/**
 * `Luxon` `DateTime` both occured during the same second
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The moments to compare
 * @param _.ma - The first `DateTime`
 * @param _.mb - The second `DateTime`
 * @returns `true` when both moments have the same unix timestamp in whole seconds
 * @example
 * ```typescript
 * const ma = DateTime.fromISO('2024-03-15T14:30:45.123Z')
 * LUXON_IS_SAME_YMDHMS({ ma, mb: DateTime.fromISO('2024-03-15T14:30:45.900Z') }) // returns true
 * LUXON_IS_SAME_YMDHMS({ ma, mb: DateTime.fromISO('2024-03-15T14:30:46Z') }) // returns false
 * ```
 */
export function LUXON_IS_SAME_YMDHMS<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return (_.ma as any).toUnixInteger() === (_.mb as any).toUnixInteger()
}

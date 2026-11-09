/**
 * `Luxon` `DateTime` both occured during the same year
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The moments to compare
 * @param _.ma - The first `DateTime`
 * @param _.mb - The second `DateTime`
 * @returns `true` when both moments have the same year
 * @example
 * ```typescript
 * const ma = DateTime.fromISO('2024-03-15T14:30:45.123Z')
 * LUXON_IS_SAME_Y({ ma, mb: DateTime.fromISO('2024-12-01T08:00:00Z') }) // returns true
 * LUXON_IS_SAME_Y({ ma, mb: DateTime.fromISO('2025-03-15T14:30:45.123Z') }) // returns false
 * ```
 */
export function LUXON_IS_SAME_Y<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return (_.ma as any).year === (_.mb as any).year
}

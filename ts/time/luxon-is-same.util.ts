import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * `Luxon` `DateTime` both occured during the same millisecond
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _ - The moments to compare
 * @param _.ma - The first `DateTime`
 * @param _.mb - The second `DateTime`
 * @returns `true` when both moments have the same timestamp in milliseconds
 * @example
 * ```typescript
 * const ma = DateTime.fromISO('2024-03-15T14:30:45.123Z')
 * LUXON_IS_SAME({ ma, mb: DateTime.fromISO('2024-03-15T14:30:45.123Z') }) // returns true
 * LUXON_IS_SAME({ ma, mb: DateTime.fromISO('2024-03-15T14:30:45.124Z') }) // returns false
 * ```
 */
export function LUXON_IS_SAME<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return TO_NUMBER(_.ma) === TO_NUMBER(_.mb)
}

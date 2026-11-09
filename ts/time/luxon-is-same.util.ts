/**
 * `Luxon` `DateTime` both occured during the same millisecond
 * * provide DateTime and Settings -> import { DateTime } from 'luxon'
 */
export function LUXON_IS_SAME<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return +_.ma === +_.mb
}

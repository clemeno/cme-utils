/**
 * `Luxon` `DateTime` both occured during the same second
 * * provide DateTime and Settings -> import { DateTime } from 'luxon'
 */
export function LUXON_IS_SAME_YMDHMS<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return (_.ma as any).toUnixInteger() === (_.mb as any).toUnixInteger()
}

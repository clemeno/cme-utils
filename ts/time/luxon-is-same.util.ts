import { TO_NUMBER } from '../convert/to-number.util.js'

/**
 * `Luxon` `DateTime` both occured during the same millisecond
 * * provide DateTime and Settings -> import { DateTime } from 'luxon'
 */
export function LUXON_IS_SAME<DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean {
  return TO_NUMBER(_.ma) === TO_NUMBER(_.mb)
}

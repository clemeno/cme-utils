/**
 * `Luxon` `DateTime` both occured during the same millisecond
 * * provide DateTime and Settings -> import type { DateTime } from 'luxon'
 */
export const LUXON_IS_SAME = <DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean => +_.ma === +_.mb

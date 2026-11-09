/**
 * `Luxon` `DateTime` `UTC`
 * * provide DateTime -> import { DateTime } from 'luxon'
 */
export function NOW_UTC<DateTime = any, TypeofDateTime = any> (_DateTime: TypeofDateTime): DateTime {
  return (_DateTime as any).utc()
}

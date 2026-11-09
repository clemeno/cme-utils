/**
 * `Luxon` `DateTime` `local`
 * * provide DateTime -> import { DateTime } from 'luxon'
 */
export function NOW<DateTime = any, TypeofDateTime = any> (_DateTime: TypeofDateTime): DateTime {
  return (_DateTime as any).local()
}

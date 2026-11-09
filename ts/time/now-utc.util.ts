/**
 * `Luxon` `DateTime` `UTC`
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _DateTime - The luxon `DateTime` class
 * @returns The current `DateTime` in the UTC zone
 * @example
 * ```typescript
 * NOW_UTC(DateTime).zoneName // returns 'UTC'
 * NOW_UTC(DateTime).offset // returns 0
 * ```
 */
export function NOW_UTC<DateTime = any, TypeofDateTime = any> (_DateTime: TypeofDateTime): DateTime {
  return (_DateTime as any).utc()
}

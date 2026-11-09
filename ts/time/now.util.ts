/**
 * `Luxon` `DateTime` `local`
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _DateTime - The luxon `DateTime` class
 * @returns The current `DateTime` in the local (default) zone
 * @example
 * ```typescript
 * // with the system zone Europe/Paris
 * NOW(DateTime).zoneName // returns 'Europe/Paris'
 * NOW(DateTime).isValid // returns true
 * ```
 */
export function NOW<DateTime = any, TypeofDateTime = any> (_DateTime: TypeofDateTime): DateTime {
  return (_DateTime as any).local()
}

import { NOW } from './now.util.js'

/**
 * `Luxon` `DateTime` `local` `toISO` or `''`
 * * provide DateTime -> import { DateTime } from 'luxon'
 * @param _DateTime - The luxon `DateTime` class
 * @returns The current local moment as an ISO string, or `''` when it has none
 * @example
 * ```typescript
 * // with the system zone Europe/Paris at 2024-03-15 14:30:45 UTC
 * NOW_ISO(DateTime) // returns '2024-03-15T15:30:45.000+01:00'
 * NOW_ISO(DateTime).length > 0 // returns true
 * ```
 */
export function NOW_ISO<TypeofDateTime = any> (_DateTime: TypeofDateTime): string {
  return NOW(_DateTime).toISO() ?? ''
}

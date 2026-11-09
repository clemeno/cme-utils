import { GET_7_DAYS_BEFORE_START } from './get-7-days-before-start.util.js'
import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` 7 days before today at midnight
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @returns The `DateTime` at 00:00 seven days before today, in the global timezone
 * @example
 * ```typescript
 * // today is 2024-03-15 in Settings.defaultZone = 'Europe/Paris'
 * GET_7_DAYS_AGO_START({ DateTime, Settings }).toISO() // returns '2024-03-08T00:00:00.000+01:00'
 * GET_7_DAYS_AGO_START({ DateTime, Settings }).hour // returns 0
 * ```
 */
export function GET_7_DAYS_AGO_START<DateTime = any, TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): DateTime {
  return GET_7_DAYS_BEFORE_START({ m: NOW_APP(_), ..._ })
}

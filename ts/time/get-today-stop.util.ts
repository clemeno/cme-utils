import { GET_DAY_STOP } from './get-day-stop.util.js'
import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` today at the end of the day
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @returns The `DateTime` at 23:59:59.999 today, in the global timezone
 * @example
 * ```typescript
 * // today is 2024-03-15 in Settings.defaultZone = 'Europe/Paris'
 * GET_TODAY_STOP({ DateTime, Settings }).toISO() // returns '2024-03-15T23:59:59.999+01:00'
 * GET_TODAY_STOP({ DateTime, Settings }).hour // returns 23
 * ```
 */
export function GET_TODAY_STOP<DateTime = any, TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): DateTime {
  return GET_DAY_STOP({ m: NOW_APP(_), ..._ })
}

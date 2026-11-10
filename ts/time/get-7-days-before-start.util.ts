import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` 7 days before a moment (defaults to `now`) at midnight
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @param _.m - The moment, defaults to now in the global timezone
 * @returns The `DateTime` at 00:00 seven days before `m`
 * @example
 * ```typescript
 * const m = DateTime.fromISO('2024-03-15T14:30:45', { zone: 'Europe/Paris' })
 * GET_7_DAYS_BEFORE_START({ DateTime, Settings, m }).toISO() // returns '2024-03-08T00:00:00.000+01:00'
 * // without m, the moment is now
 * GET_7_DAYS_BEFORE_START({ DateTime, Settings }).hour // returns 0
 * ```
 */
export function GET_7_DAYS_BEFORE_START<DateTime = any, TypeofDateTime = any> (_: {
  DateTime: TypeofDateTime
  Settings: AppLuxonSettings
  m?: DateTime
}): DateTime {
  return ((_.m ?? NOW_APP(_)) as any).minus({ day: 7 }).startOf('day')
}

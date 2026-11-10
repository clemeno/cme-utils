import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` a moment (defaults to `now`) at the end of the day
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The parameters
 * @param _.m - The moment, defaults to now in the global timezone
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @returns The `DateTime` at 23:59:59.999 on the day of `m`
 * @example
 * ```typescript
 * const m = DateTime.fromISO('2024-03-15T14:30:45', { zone: 'Europe/Paris' })
 * GET_DAY_STOP({ DateTime, Settings, m }).toISO() // returns '2024-03-15T23:59:59.999+01:00'
 * // without m, the moment is now
 * GET_DAY_STOP({ DateTime, Settings }).millisecond // returns 999
 * ```
 */
export function GET_DAY_STOP<DateTime = any, TypeofDateTime = any> (_: {
  m?: DateTime
  DateTime: TypeofDateTime
  Settings: AppLuxonSettings
}): DateTime {
  return ((_.m ?? NOW_APP(_)) as any).endOf('day')
}

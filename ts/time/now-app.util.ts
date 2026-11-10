import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { GET_TZ } from './get-tz.util.js'
import { NOW } from './now.util.js'

/**
 * `Luxon` `DateTime` set to the global timezone using `Settings`
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @returns The current `DateTime` in the global timezone, 'UTC' when it has none
 * @example
 * ```typescript
 * Settings.defaultZone = 'Europe/Paris'
 * NOW_APP({ DateTime, Settings }).zoneName // returns 'Europe/Paris'
 * Settings.defaultZone = 'UTC'
 * NOW_APP({ DateTime, Settings }).zoneName // returns 'UTC'
 * ```
 */
export function NOW_APP<DateTime = any, TypeofDateTime = any> (_: {
  DateTime: TypeofDateTime
  Settings: AppLuxonSettings
}): DateTime {
  const DateTimeClass = _.DateTime as any
  return NOW(DateTimeClass).setZone(GET_TZ(_.Settings) ?? 'UTC') as any
}

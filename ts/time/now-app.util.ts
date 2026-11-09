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
 * // with Settings.defaultZone = 'Europe/Paris'
 * NOW_APP({ DateTime, Settings }).zoneName // returns 'Europe/Paris'
 * // with Settings.defaultZone = 'UTC'
 * NOW_APP({ DateTime, Settings }).zoneName // returns 'UTC'
 * ```
 */
export function NOW_APP<DateTime = any, TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): DateTime {
  const DateTimeClass = _.DateTime as any
  const SettingsClass = _.Settings as any
  return NOW(DateTimeClass).setZone(GET_TZ(SettingsClass) ?? 'UTC') as any
}

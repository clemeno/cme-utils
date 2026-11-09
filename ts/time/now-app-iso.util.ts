import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` `toISO` or `''` set to the global timezone using `Settings`
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @returns The current moment as an ISO string in the global timezone, or `''` when it has none
 * @example
 * ```typescript
 * // with Settings.defaultZone = 'Europe/Paris' at 2024-03-15 14:30:45 UTC
 * NOW_APP_ISO({ DateTime, Settings }) // returns '2024-03-15T15:30:45.000+01:00'
 * NOW_APP_ISO({ DateTime, Settings }).endsWith('+01:00') // returns true
 * ```
 */
export function NOW_APP_ISO<TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): string {
  return NOW_APP(_).toISO() ?? ''
}

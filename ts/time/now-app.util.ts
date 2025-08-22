import { GET_TZ } from './get-tz.util.js'
import { NOW } from './now.util.js'

/**
 * `Luxon` `DateTime` set to the global timezone using `Settings`
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const NOW_APP = <DateTime = any, TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): DateTime => {
  const DateTimeClass = _.DateTime as any
  const SettingsClass = _.Settings as any
  return NOW(DateTimeClass).setZone(GET_TZ(SettingsClass) ?? 'UTC') as any
}

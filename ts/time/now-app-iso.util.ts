import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` `toISO` or `''` set to the global timezone using `Settings`
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const NOW_APP_ISO = <TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): string => NOW_APP(_).toISO() ?? ''

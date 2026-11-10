import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { FROM_ISO_TO_LOCAL_FORMAT } from './from-iso-to-local-format.util.js'
import { LUXON_FORMAT_LOCAL_HMS } from './luxon.util.js'

/**
 * Formats an ISO string as a local time to the second (luxon `TT`) in the global timezone.
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The conversion parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @param _.iso - The ISO string to format
 * @returns The formatted time, or `''` when `iso` is empty or invalid
 * @example
 * ```typescript
 * // with Settings.defaultZone = 'Europe/Paris' and the en-US locale
 * FROM_ISO_TO_LOCAL_TT({ DateTime, Settings, iso: '2024-03-15T14:30:45.123Z' }) // returns '15:30:45'
 * FROM_ISO_TO_LOCAL_TT({ DateTime, Settings, iso: 'not a date' }) // returns ''
 * ```
 */
export function FROM_ISO_TO_LOCAL_TT<TypeofDateTime = any> (_: {
  DateTime: TypeofDateTime
  Settings: AppLuxonSettings
  iso: string
}): string {
  return FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HMS })
}

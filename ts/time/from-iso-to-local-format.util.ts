import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { IS_ON } from '../check/is-on.util.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import { GET_TZ } from './get-tz.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HMS_S_Z } from './luxon.util.js'

/**
 * Formats an ISO string with a luxon format in the global timezone.
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The conversion parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @param _.iso - The ISO string to format
 * @param _.format - The luxon format, defaults to `LUXON_FORMAT_LOCAL_YMD_HMS_S_Z` ('D TT.SSS z')
 * @returns The formatted moment, or `''` when `iso` is empty or invalid
 * @example
 * ```typescript
 * // with Settings.defaultZone = 'Europe/Paris'
 * FROM_ISO_TO_LOCAL_FORMAT({ DateTime, Settings, iso: '2024-03-15T14:30:45.123Z', format: 'yyyy-MM-dd HH:mm' }) // returns '2024-03-15 15:30'
 * FROM_ISO_TO_LOCAL_FORMAT({ DateTime, Settings, iso: 'not a date', format: 'yyyy-MM-dd' }) // returns ''
 * ```
 */
export function FROM_ISO_TO_LOCAL_FORMAT<TypeofDateTime = any> (_: {
  DateTime: TypeofDateTime
  Settings: AppLuxonSettings
  iso: string
  format?: string
}): string {
  const DateTimeClass = _.DateTime as any
  const { fromISO, invalid } = DateTimeClass

  const m = IS_A_STRING_AND_NOT_EMPTY(TO_STRING(_.iso)) ? fromISO(TO_STRING(_.iso)) : invalid('iso')

  return IS_ON(m.isValid) ? m.setZone(GET_TZ(_.Settings)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { IS_NUMERIC } from '../number/is-numeric.util.js'
import { IS_ON } from '../check/is-on.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { GET_TZ } from './get-tz.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HMS_S_Z } from './luxon.util.js'

/**
 * Formats a unix timestamp in seconds with a luxon format in the global timezone.
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The conversion parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @param _.unix - The unix timestamp in seconds
 * @param _.format - The luxon format, defaults to `LUXON_FORMAT_LOCAL_YMD_HMS_S_Z` ('D TT.SSS z')
 * @returns The formatted moment, or `''` when `unix` is not numeric
 * @example
 * ```typescript
 * // with Settings.defaultZone = 'Europe/Paris'
 * FROM_UNIX_TO_LOCAL_FORMAT({ DateTime, Settings, unix: 1710513045, format: 'yyyy-MM-dd HH:mm' }) // returns '2024-03-15 15:30'
 * FROM_UNIX_TO_LOCAL_FORMAT({ DateTime, Settings, unix: NaN, format: 'yyyy-MM-dd' }) // returns ''
 * ```
 */
export function FROM_UNIX_TO_LOCAL_FORMAT<TypeofDateTime = any> (_: {
  DateTime: TypeofDateTime
  Settings: AppLuxonSettings
  unix: number
  format?: string
}): string {
  const DateTimeClass = _.DateTime as any
  const { fromSeconds, invalid } = DateTimeClass

  const m = IS_NUMERIC(_.unix) ? fromSeconds(TO_NUMBER(_.unix)) : invalid('unix')

  return IS_ON(m.isValid) ? m.setZone(GET_TZ(_.Settings)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

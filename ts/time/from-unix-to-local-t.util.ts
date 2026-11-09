import { FROM_UNIX_TO_LOCAL_FORMAT } from './from-unix-to-local-format.util.js'
import { LUXON_FORMAT_LOCAL_HM } from './luxon.util.js'

/**
 * Formats a unix timestamp in seconds as a local time to the minute (luxon `T`) in the global timezone.
 * * provide DateTime and Settings -> import { DateTime, Settings } from 'luxon'
 * @param _ - The conversion parameters
 * @param _.DateTime - The luxon `DateTime` class
 * @param _.Settings - The luxon `Settings` class
 * @param _.unix - The unix timestamp in seconds
 * @returns The formatted time, or `''` when `unix` is not numeric
 * @example
 * ```typescript
 * // with Settings.defaultZone = 'Europe/Paris' and the en-US locale
 * FROM_UNIX_TO_LOCAL_T({ DateTime, Settings, unix: 1710513045 }) // returns '15:30'
 * FROM_UNIX_TO_LOCAL_T({ DateTime, Settings, unix: 'abc' }) // returns ''
 * ```
 */
export function FROM_UNIX_TO_LOCAL_T<TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
  unix: number
}): string {
  return FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HM })
}

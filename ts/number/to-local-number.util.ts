import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { IS_NUMERIC } from './is-numeric.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { GET_LOCALE } from '../space/index.js'

/**
 * Formats a numeric value as a string, with the grouping and decimal separators of the locale of `Settings`.
 * * provide Settings -> import { Settings } from 'luxon'
 * @param _ - The number and the Luxon settings
 * @param _.Settings - The Luxon `Settings` (only its `defaultLocale` is read)
 * @param _.x - The value to format, any numeric value
 * @returns The formatted number, or an empty string when `x` is not numeric
 * @example
 * ```typescript
 * // with Settings.defaultLocale = 'en-US'
 * TO_LOCAL_NUMBER({ Settings, x: 1234567.891 }) // returns '1,234,567.891'
 * TO_LOCAL_NUMBER({ Settings, x: '42' }) // returns '42'
 * TO_LOCAL_NUMBER({ Settings, x: 'abc' }) // returns ''
 * TO_LOCAL_NUMBER({ Settings, x: null }) // returns ''
 * ```
 */
export function TO_LOCAL_NUMBER (_: {
  Settings: AppLuxonSettings
  x: any
}): string {
  return IS_NUMERIC(_.x) ? TO_NUMBER(_.x).toLocaleString(GET_LOCALE(_.Settings)) : ''
}

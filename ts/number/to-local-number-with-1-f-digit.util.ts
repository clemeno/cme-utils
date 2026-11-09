import { IS_NUMERIC } from './is-numeric.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { GET_LOCALE } from '../space/index.js'

/**
 * Formats a numeric value as a string with exactly 1 fraction digit, in the locale of `Settings`.
 * * provide Settings -> import { Settings } from 'luxon'
 * @param _ - The number and the Luxon settings
 * @param _.Settings - The Luxon `Settings` (only its `defaultLocale` is read)
 * @param _.x - The value to format, any numeric value
 * @returns The formatted number, or an empty string when `x` is not numeric
 * @example
 * ```typescript
 * TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: { defaultLocale: 'en-US' }, x: 1234.56 }) // returns '1,234.6'
 * TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: { defaultLocale: 'en-US' }, x: 3 }) // returns '3.0'
 * TO_LOCAL_NUMBER_WITH_1_F_DIGIT({ Settings: { defaultLocale: 'en-US' }, x: 'abc' }) // returns ''
 * ```
 */
export function TO_LOCAL_NUMBER_WITH_1_F_DIGIT<TypeofSettings = any> (_: {
  Settings: TypeofSettings
  x: any
}): string {
  return (
    IS_NUMERIC(_.x)
      ? TO_NUMBER(_.x).toLocaleString(GET_LOCALE(_.Settings), { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : ''
  )
}

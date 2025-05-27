import { LUXON_IS_SAME_YM } from './luxon-is-same-ym.util.js'

/**
 * `Luxon` `DateTime` both occured during the same day
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const LUXON_IS_SAME_YMD = <DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean => {
  return ((_.ma as any).day === (_.mb as any).day) && LUXON_IS_SAME_YM(_)
}

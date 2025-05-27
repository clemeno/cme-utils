import { LUXON_IS_SAME_YMD } from './luxon-is-same-ymd.util.js'

/**
 * `Luxon` `DateTime` both occured during the same hour
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const LUXON_IS_SAME_YMDH = <DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean => {
  return ((_.ma as any).hour === (_.mb as any).hour) && LUXON_IS_SAME_YMD(_)
}

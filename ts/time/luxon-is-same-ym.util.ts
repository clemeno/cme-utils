import { LUXON_IS_SAME_Y } from './luxon-is-same-y.util.js'

/**
 * `Luxon` `DateTime` both occured during the same month
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const LUXON_IS_SAME_YM = <DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean => {
  return ((_.ma as any).month === (_.mb as any).month) && LUXON_IS_SAME_Y(_)
}

import { LUXON_IS_SAME_YMDH } from './luxon-is-same-ymdh.util.js'

/**
 * `Luxon` `DateTime` both occured during the same minute
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const LUXON_IS_SAME_YMDHM = <DateTime = any> (_: { ma: DateTime, mb: DateTime }): boolean => {
  return ((_.ma as any).minute === (_.mb as any).minute) && LUXON_IS_SAME_YMDH(_)
}

import type { DateTime } from 'luxon'
import { LUXON_IS_SAME_YMD } from './luxon-is-same-ymd.util.js'

export const LUXON_IS_SAME_YMDH = (_: { ma: DateTime, mb: DateTime }): boolean => (_.ma.hour === _.mb.hour) && LUXON_IS_SAME_YMD(_)

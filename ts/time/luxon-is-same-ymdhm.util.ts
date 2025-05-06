import type { DateTime } from 'luxon'
import { LUXON_IS_SAME_YMDH } from './luxon-is-same-ymdh.util.js'

export const LUXON_IS_SAME_YMDHM = (_: { ma: DateTime, mb: DateTime }): boolean => (_.ma.minute === _.mb.minute) && LUXON_IS_SAME_YMDH(_)

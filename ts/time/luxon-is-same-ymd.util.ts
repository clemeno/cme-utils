import type { DateTime } from 'luxon'
import { LUXON_IS_SAME_YM } from './luxon-is-same-ym.util.js'

export const LUXON_IS_SAME_YMD = (_: { ma: DateTime, mb: DateTime }): boolean => (_.ma.day === _.mb.day) && LUXON_IS_SAME_YM(_)

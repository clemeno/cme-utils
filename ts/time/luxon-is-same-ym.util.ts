import type { DateTime } from 'luxon'
import { LUXON_IS_SAME_Y } from './luxon-is-same-y.util.js'

export const LUXON_IS_SAME_YM = (_: { ma: DateTime, mb: DateTime }): boolean => (_.ma.month === _.mb.month) && LUXON_IS_SAME_Y(_)

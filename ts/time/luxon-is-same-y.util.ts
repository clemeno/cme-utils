import type { DateTime } from 'luxon'

export const LUXON_IS_SAME_Y = (_: { ma: DateTime, mb: DateTime }): boolean => _.ma.year === _.mb.year

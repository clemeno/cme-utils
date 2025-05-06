import type { DateTime } from 'luxon'

export const LUXON_IS_SAME_YMDHMS = (_: { ma: DateTime, mb: DateTime }): boolean => _.ma.toUnixInteger() === _.mb.toUnixInteger()

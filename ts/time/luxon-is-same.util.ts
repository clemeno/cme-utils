import type { DateTime } from 'luxon'

export const LUXON_IS_SAME = (_: { ma: DateTime, mb: DateTime }): boolean => +_.ma === +_.mb

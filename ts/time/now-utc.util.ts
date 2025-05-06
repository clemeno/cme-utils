import type { DateTime } from 'luxon'

/** `Luxon` `DateTime` `UTC` */
export const NOW_UTC = (_DateTime: typeof DateTime): DateTime => _DateTime.utc()

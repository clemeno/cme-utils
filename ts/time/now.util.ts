import type { DateTime } from 'luxon'

/** `Luxon` `DateTime` `local` */
export const NOW = (_DateTime: typeof DateTime): DateTime => _DateTime.local()

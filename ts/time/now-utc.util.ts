/**
 * `Luxon` `DateTime` `UTC`
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const NOW_UTC = <DateTime = any, TypeofDateTime = any> (_DateTime: TypeofDateTime): DateTime => (_DateTime as any).utc()

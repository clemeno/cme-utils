/**
 * `Luxon` `DateTime` `local`
 * * provide DateTime -> import { DateTime } from 'luxon'
 */
export const NOW = <DateTime = any, TypeofDateTime = any> (_DateTime: TypeofDateTime): DateTime => (_DateTime as any).local()

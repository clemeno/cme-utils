import { NOW } from './now.util.js'

/**
 * `Luxon` `DateTime` `local` `toISO` or `''`
 * * provide DateTime -> import { DateTime } from 'luxon'
 */
export function NOW_ISO<TypeofDateTime = any> (_DateTime: TypeofDateTime): string {
  return NOW(_DateTime).toISO() ?? ''
}

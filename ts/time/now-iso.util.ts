import { NOW } from './now.util.js'

/**
 * `Luxon` `DateTime` `local` `toISO` or `''`
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const NOW_ISO = <TypeofDateTime = any> (_DateTime: TypeofDateTime): string => NOW(_DateTime).toISO() ?? ''

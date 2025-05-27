import { LUXON_FORMAT_YMD_HMS } from './luxon.util.js'
import { NOW_UTC } from './now-utc.util.js'

/**
 * current SQL `datetime` `UTC` - **without** timzeone display - using `Luxon` `DateTime`
 * * provide DateTime -> import type { DateTime } from 'luxon'
 */
export const MYSQL_DATETIME_NOW_UTC = <TypeofDateTime = any> (_DateTime: TypeofDateTime): string => {
  return NOW_UTC(_DateTime).toFormat(LUXON_FORMAT_YMD_HMS)
}

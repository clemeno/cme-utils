import type { DateTime } from 'luxon'
import { LUXON_FORMAT_YMD_HMS } from './luxon.util.js'
import { NOW_UTC } from './now-utc.util.js'

/** current SQL `datetime` `UTC` - **without** timzeone display - using `Luxon` `DateTime` */
export const MYSQL_DATETIME_NOW_UTC = (_DateTime: typeof DateTime): string => NOW_UTC(_DateTime).toFormat(LUXON_FORMAT_YMD_HMS)

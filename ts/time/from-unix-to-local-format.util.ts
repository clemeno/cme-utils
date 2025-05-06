import type { DateTime, Settings } from 'luxon'
import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { GET_TZ } from './get-tz.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HMS_S_Z } from './luxon.util.js'

export const FROM_UNIX_TO_LOCAL_FORMAT = (_: {
  unix: any
  format?: string
  DateTime: typeof DateTime
  Settings: typeof Settings
}): string => {
  const m = IS_NUMERIC(_.unix) ? _.DateTime.fromSeconds(TO_NUMBER(_.unix)) : _.DateTime.invalid('unix')
  return m.isValid ? m.setZone(GET_TZ(_.Settings)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

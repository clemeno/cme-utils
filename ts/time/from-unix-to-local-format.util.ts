import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { IS_ON } from '../check/is-on.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { GET_TZ } from './get-tz.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HMS_S_Z } from './luxon.util.js'

/**
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const FROM_UNIX_TO_LOCAL_FORMAT = <TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
  unix: any
  format?: string
}): string => {
  const DateTimeClass = _.DateTime as any
  const { fromSeconds, invalid } = DateTimeClass

  const SettingsClass = _.Settings as any

  const m = IS_NUMERIC(_.unix) ? fromSeconds(TO_NUMBER(_.unix)) : invalid('unix')

  return IS_ON(m.isValid) ? m.setZone(GET_TZ(SettingsClass)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

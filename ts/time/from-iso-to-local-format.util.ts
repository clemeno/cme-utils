import { IS_ON } from '../check/is-on.util.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import { GET_TZ } from './get-tz.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HMS_S_Z } from './luxon.util.js'

/**
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const FROM_ISO_TO_LOCAL_FORMAT = <TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
  iso: any
  format?: string
}): string => {
  const DateTimeClass = _.DateTime as any
  const { fromISO, invalid } = DateTimeClass

  const SettingsClass = _.Settings as any

  const m = IS_A_STRING_AND_NOT_EMPTY(TO_STRING(_.iso)) ? fromISO(TO_STRING(_.iso)) : invalid('iso')

  return IS_ON(m.isValid) ? m.setZone(GET_TZ(SettingsClass)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

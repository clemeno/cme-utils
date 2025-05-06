import type { DateTime, Settings } from 'luxon'
import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { TO_STRING } from '../convert/to-string.util.js'
import { GET_TZ } from './get-tz.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HMS_S_Z } from './luxon.util.js'

export const FROM_ISO_TO_LOCAL_FORMAT = (_: {
  iso: any
  format?: string
  DateTime: typeof DateTime
  Settings: typeof Settings
}): string => {
  const m = IS_A_STRING_AND_NOT_EMPTY(TO_STRING(_.iso)) ? _.DateTime.fromISO(TO_STRING(_.iso)) : _.DateTime.invalid('iso')
  return m.isValid ? m.setZone(GET_TZ(_.Settings)).toFormat(_.format ?? LUXON_FORMAT_LOCAL_YMD_HMS_S_Z) : ''
}

import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { SET_DOCUMENT_TZ } from './set-document-tz.util.js'

/**
 * set the global timezone to `Luxon` `Settings`
 * * provide Settings -> import type { Settings } from 'luxon'
 */
export const SET_TZ = <TypeofSettings = any> (_: {
  Settings: TypeofSettings
  tz: string
}): void => {
  const tz = IS_A_STRING_AND_NOT_EMPTY(_.tz) ? _.tz : 'UTC'

  const SettingsClass: any = _.Settings

  SettingsClass.defaultZone = tz

  SET_DOCUMENT_TZ(tz)
}

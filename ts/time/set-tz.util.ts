import type { Settings } from 'luxon'
import { IS_A_STRING_AND_NOT_EMPTY } from '../check/is-a-string-and-not-empty.util.js'
import { SET_DOCUMENT_TZ } from './set-document-tz.util.js'

/** set the global timezone to `Luxon` `Settings` */
export const SET_TZ = (_: {
  tz: string
  Settings: typeof Settings
}): void => {
  const tz = IS_A_STRING_AND_NOT_EMPTY(_.tz) ? _.tz : 'UTC'

  _.Settings.defaultZone = tz

  SET_DOCUMENT_TZ(tz)
}

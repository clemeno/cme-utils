import type { AppLuxonSettings } from '../app-luxon-settings.js'
import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { SET_DOCUMENT_TZ } from './set-document-tz.util.js'

/**
 * Sets the global timezone to `Luxon` `Settings`, and writes it to the document `tz` attribute in a browser
 * * provide Settings -> import { Settings } from 'luxon'
 * @param _ - The parameters
 * @param _.Settings - The luxon `Settings` class, its `defaultZone` is set
 * @param _.tz - The IANA timezone, 'UTC' when empty
 * @returns Nothing
 * @example
 * ```typescript
 * SET_TZ({ Settings, tz: 'Asia/Tokyo' }) // returns undefined
 * Settings.defaultZone.name // returns 'Asia/Tokyo'
 * SET_TZ({ Settings, tz: '' }) // returns undefined
 * Settings.defaultZone.name // returns 'UTC'
 * ```
 */
export function SET_TZ (_: {
  Settings: AppLuxonSettings
  tz: string
}): void {
  const tz = IS_A_STRING_AND_NOT_EMPTY(_.tz) ? _.tz : 'UTC'

  _.Settings.defaultZone = tz

  SET_DOCUMENT_TZ(tz)
}

import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { SET_DOCUMENT_TZ } from './set-document-tz.util.js'

/**
 * set the global timezone to `Luxon` `Settings`
 * * provide Settings -> import { Settings } from 'luxon'
 * @param _ - The parameters
 * @param _.Settings - The luxon `Settings` class, its `defaultZone` is set
 * @param _.tz - The IANA timezone, 'UTC' when empty
 * @returns Nothing
 * @example
 * ```typescript
 * const settings = { defaultZone: 'Europe/Paris' }
 * SET_TZ({ Settings: settings, tz: 'Asia/Tokyo' }) // returns undefined
 * settings.defaultZone // returns 'Asia/Tokyo'
 * SET_TZ({ Settings: settings, tz: '' }) // returns undefined
 * settings.defaultZone // returns 'UTC'
 * ```
 */
export function SET_TZ<TypeofSettings = any> (_: {
  Settings: TypeofSettings
  tz: string
}): void {
  const tz = IS_A_STRING_AND_NOT_EMPTY(_.tz) ? _.tz : 'UTC'

  const SettingsClass: any = _.Settings

  SettingsClass.defaultZone = tz

  SET_DOCUMENT_TZ(tz)
}

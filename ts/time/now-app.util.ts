import type { DateTime, Settings } from 'luxon'
import { GET_TZ } from './get-tz.util.js'
import { NOW } from './now.util.js'

/** `Luxon` `DateTime` set to the global timezone */
export const NOW_APP = (_: {
  DateTime: typeof DateTime
  Settings: typeof Settings
}): DateTime => NOW(_.DateTime).setZone(GET_TZ(_.Settings) ?? 'UTC')

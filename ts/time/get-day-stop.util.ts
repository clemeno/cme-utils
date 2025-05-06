import type { DateTime, Settings } from 'luxon'
import { NOW_APP } from './now-app.util.js'

/** `Luxon` `DateTime` a moment (defaults to `now`) at the end of the day */
export const GET_DAY_STOP = (_: {
  m?: DateTime
  DateTime: typeof DateTime
  Settings: typeof Settings
}): DateTime => (_.m ?? NOW_APP(_)).endOf('day')

import type { DateTime, Settings } from 'luxon'
import { NOW_APP } from './now-app.util.js'

/** `Luxon` `DateTime` 7 days before a moment (defaults to `now`) at midnight */
export const GET_7_DAYS_BEFORE_START = (_: {
  m?: DateTime
  DateTime: typeof DateTime
  Settings: typeof Settings
}): DateTime => (_.m ?? NOW_APP(_)).minus({ day: 7 }).startOf('day')

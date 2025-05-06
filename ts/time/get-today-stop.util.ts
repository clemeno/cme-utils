import type { DateTime, Settings } from 'luxon'
import { GET_DAY_STOP } from './get-day-stop.util.js'
import { NOW_APP } from './now-app.util.js'

/** `Luxon` `DateTime` today at the end of the day */
export const GET_TODAY_STOP = (_: {
  DateTime: typeof DateTime
  Settings: typeof Settings
}): DateTime => GET_DAY_STOP({ m: NOW_APP(_), ..._ })

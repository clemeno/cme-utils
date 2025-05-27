import { GET_DAY_STOP } from './get-day-stop.util.js'
import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` today at the end of the day
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const GET_TODAY_STOP = <DateTime = any, TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): DateTime => GET_DAY_STOP({ m: NOW_APP(_), ..._ })

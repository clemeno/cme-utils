import { GET_7_DAYS_BEFORE_START } from './get-7-days-before-start.util.js'
import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` 7 days before today at midnight
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const GET_7_DAYS_AGO_START = <DateTime = any, TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): DateTime => GET_7_DAYS_BEFORE_START({ m: NOW_APP(_), ..._ })

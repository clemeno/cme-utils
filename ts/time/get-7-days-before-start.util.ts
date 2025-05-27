import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` 7 days before a moment (defaults to `now`) at midnight
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const GET_7_DAYS_BEFORE_START = <DateTime = any, TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
  m?: DateTime
}): DateTime => ((_.m ?? NOW_APP(_)) as any).minus({ day: 7 }).startOf('day')

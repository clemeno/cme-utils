import { NOW_APP } from './now-app.util.js'

/**
 * `Luxon` `DateTime` a moment (defaults to `now`) at the end of the day
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const GET_DAY_STOP = <DateTime = any, TypeofDateTime = any, TypeofSettings = any> (_: {
  m?: DateTime
  DateTime: TypeofDateTime
  Settings: TypeofSettings
}): DateTime => ((_.m ?? NOW_APP(_)) as any).endOf('day')

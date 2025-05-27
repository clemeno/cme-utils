import { FROM_UNIX_TO_LOCAL_FORMAT } from './from-unix-to-local-format.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HMS } from './luxon.util.js'

/**
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const FROM_UNIX_TO_LOCAL_DTT = <TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
  unix: any
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HMS })

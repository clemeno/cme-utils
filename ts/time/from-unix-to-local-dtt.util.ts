import type { DateTime, Settings } from 'luxon'
import { FROM_UNIX_TO_LOCAL_FORMAT } from './from-unix-to-local-format.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HMS } from './luxon.util.js'

export const FROM_UNIX_TO_LOCAL_DTT = (_: {
  unix: any
  DateTime: typeof DateTime
  Settings: typeof Settings
}): string => FROM_UNIX_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HMS })

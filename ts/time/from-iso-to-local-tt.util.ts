import type { DateTime, Settings } from 'luxon'
import { FROM_ISO_TO_LOCAL_FORMAT } from './from-iso-to-local-format.util.js'
import { LUXON_FORMAT_LOCAL_HMS } from './luxon.util.js'

export const FROM_ISO_TO_LOCAL_TT = (_: {
  iso: any
  DateTime: typeof DateTime
  Settings: typeof Settings
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_HMS })

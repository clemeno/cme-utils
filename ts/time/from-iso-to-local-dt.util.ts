import { FROM_ISO_TO_LOCAL_FORMAT } from './from-iso-to-local-format.util.js'
import { LUXON_FORMAT_LOCAL_YMD_HM } from './luxon.util.js'

/**
 * * provide DateTime and Settings -> import type { DateTime, Settings } from 'luxon'
 */
export const FROM_ISO_TO_LOCAL_DT = <TypeofDateTime = any, TypeofSettings = any> (_: {
  DateTime: TypeofDateTime
  Settings: TypeofSettings
  iso: any
}): string => FROM_ISO_TO_LOCAL_FORMAT({ ..._, format: LUXON_FORMAT_LOCAL_YMD_HM })

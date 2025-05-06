import type { Settings } from 'luxon'
import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { GET_LOCALE } from '../space/index.js'

export const TO_LOCAL_NUMBER = (_: {
  x: any
  Settings: typeof Settings
}): string => IS_NUMERIC(_.x) ? TO_NUMBER(_.x).toLocaleString(GET_LOCALE(_.Settings)) : ''

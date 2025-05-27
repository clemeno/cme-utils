import { IS_NUMERIC } from '../check/is-numeric.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import { GET_LOCALE } from '../space/index.js'

/**
 * * provide Settings -> import type { Settings } from 'luxon'
 */
export const TO_LOCAL_NUMBER_WITH_1_F_DIGIT = <TypeofSettings = any> (_: {
  Settings: TypeofSettings
  x: any
}): string => (
    IS_NUMERIC(_.x)
      ? TO_NUMBER(_.x).toLocaleString(GET_LOCALE(_.Settings), { minimumFractionDigits: 1, maximumFractionDigits: 1 })
      : ''
  )

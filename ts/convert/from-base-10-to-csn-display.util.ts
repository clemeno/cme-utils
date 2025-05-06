import type { numeric } from '../numeric.js'
import { FROM_BASE_10_TO_16 } from './from-base-10-to-16.util.js'
import { FROM_BASE_16_TO_CARD_SERIAL } from './from-base-16-to-card-serial.util.js'
import { TO_STRING } from './to-string.util.js'

export const FROM_BASE_10_TO_CSN_DISPLAY = (_: { from: numeric, bCsnHexNumber: boolean, bCsnHexCard: boolean }): string => {
  let res = TO_STRING(_.from)

  if (_.bCsnHexNumber || _.bCsnHexCard) {
    res = FROM_BASE_10_TO_16(res)

    if (_.bCsnHexCard) {
      res = FROM_BASE_16_TO_CARD_SERIAL(res)
    }
  }

  return res
}

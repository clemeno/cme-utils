import type { numeric } from '../numeric.js'
import { FROM_BASE_16_TO_10 } from './from-base-16-to-10.util.js'
import { FROM_BASE_16_TO_CARD_SERIAL } from './from-base-16-to-card-serial.util.js'
import { TO_STRING } from './to-string.util.js'

export const FROM_BASE_16_TO_CSN_DISPLAY = (_: { from: numeric, bCsnHexCard: boolean, csnDecNumber: boolean }): string => {
  let res = TO_STRING(_.from)

  if (_.bCsnHexCard) {
    res = FROM_BASE_16_TO_CARD_SERIAL(res)
  } else if (_.csnDecNumber) {
    res = FROM_BASE_16_TO_10(res)
  }

  return res
}

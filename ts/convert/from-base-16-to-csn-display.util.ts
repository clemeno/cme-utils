import type { numeric } from '../numeric.js'
import { FROM_BASE_16_TO_10 } from './from-base-16-to-10.util.js'
import { FROM_BASE_16_TO_CARD_SERIAL } from './from-base-16-to-card-serial.util.js'
import { TO_STRING } from './to-string.util.js'

/**
 * Formats a hexadecimal card serial number for display: in the card serial format, in decimal, or kept as is.
 * @param _ - The number and the display flags
 * @param _.from - The hexadecimal number
 * @param _.bCsnHexCard - `true` to display the card serial format (`xxxxxxxx xxxxxxxx`), which wins over the decimal number
 * @param _.bCsnDecNumber - `true` to display the number in decimal
 * @returns The displayed number
 * @example
 * ```typescript
 * FROM_BASE_16_TO_CSN_DISPLAY({ from: 'ff', bCsnHexCard: true, bCsnDecNumber: false }) // returns '00000000 000000ff'
 * FROM_BASE_16_TO_CSN_DISPLAY({ from: 'ff', bCsnHexCard: false, bCsnDecNumber: true }) // returns '255'
 * FROM_BASE_16_TO_CSN_DISPLAY({ from: 'ff', bCsnHexCard: false, bCsnDecNumber: false }) // returns 'ff'
 * ```
 */
export function FROM_BASE_16_TO_CSN_DISPLAY (_: { from: numeric, bCsnHexCard: boolean, bCsnDecNumber: boolean }): string {
  let res = TO_STRING(_.from)

  if (_.bCsnHexCard) {
    res = FROM_BASE_16_TO_CARD_SERIAL(res)
  } else if (_.bCsnDecNumber) {
    res = FROM_BASE_16_TO_10(res)
  }

  return res
}

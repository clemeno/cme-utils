import type { numeric } from '../numeric.js'
import { FROM_BASE_10_TO_16 } from './from-base-10-to-16.util.js'
import { FROM_BASE_16_TO_CARD_SERIAL } from './from-base-16-to-card-serial.util.js'
import { TO_STRING } from './to-string.util.js'

/**
 * Formats a decimal card serial number for display: kept decimal, in hexadecimal, or in the card serial format.
 * @param _ - The number and the display flags
 * @param _.from - The decimal number
 * @param _.bCsnHexNumber - `true` to display the number in hexadecimal
 * @param _.bCsnHexCard - `true` to display the number in the card serial format (`xxxxxxxx xxxxxxxx`), which wins over the hex number
 * @returns The displayed number, an empty string when `from` is not set
 * @example
 * ```typescript
 * FROM_BASE_10_TO_CSN_DISPLAY({ from: 255, bCsnHexNumber: false, bCsnHexCard: false }) // returns '255'
 * FROM_BASE_10_TO_CSN_DISPLAY({ from: 255, bCsnHexNumber: true, bCsnHexCard: false }) // returns 'ff'
 * FROM_BASE_10_TO_CSN_DISPLAY({ from: 255, bCsnHexNumber: false, bCsnHexCard: true }) // returns '00000000 000000ff'
 * FROM_BASE_10_TO_CSN_DISPLAY({ from: null, bCsnHexNumber: false, bCsnHexCard: false }) // returns ''
 * ```
 */
export function FROM_BASE_10_TO_CSN_DISPLAY (_: { from: numeric | null | undefined, bCsnHexNumber: boolean, bCsnHexCard: boolean }): string {
  let res = TO_STRING(_.from)

  if (_.bCsnHexNumber || _.bCsnHexCard) {
    res = FROM_BASE_10_TO_16(res)

    if (_.bCsnHexCard) {
      res = FROM_BASE_16_TO_CARD_SERIAL(res)
    }
  }

  return res
}

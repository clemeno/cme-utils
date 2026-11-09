import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'

/**
 * Formats a hexadecimal number into the card serial format: the last 16 digits, left-padded with zeros, in two groups of 8.
 * @param _ - The hexadecimal string
 * @returns The card serial `xxxxxxxx xxxxxxxx`, or an empty string when the input is not a non-empty string
 * @example
 * ```typescript
 * FROM_BASE_16_TO_CARD_SERIAL('ff') // returns '00000000 000000ff'
 * // only the last 16 digits are kept
 * FROM_BASE_16_TO_CARD_SERIAL('0123456789abcdef01') // returns '23456789 abcdef01'
 * FROM_BASE_16_TO_CARD_SERIAL('') // returns ''
 * ```
 */
export function FROM_BASE_16_TO_CARD_SERIAL (_: string): string {
  let res = ''

  if (IS_A_STRING_AND_NOT_EMPTY(_)) {
    const s = `${_}`.padStart(16, '0')

    res = `${s.slice(-16, -8)} ${s.slice(-8)}`
  }

  return res
}

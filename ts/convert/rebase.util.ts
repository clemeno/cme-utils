import { SYMBOLS } from '../constant/symbols.util.js'
import type { numeric } from '../numeric.js'

/**
 * from pure numeric string in base [2,36] to base [2,36] else throws
 * @param _ - The number and the bases
 * @param _.from - The number to convert, written in base `base`
 * @param _.base - The base of `from`
 * @param _.toBase - The target base
 * @returns The number written in the target base, `'0'` for zero
 * @example
 * ```typescript
 * REBASE({ from: 255, base: 10, toBase: 16 }) // returns 'ff'
 * REBASE({ from: 'ff', base: 16, toBase: 2 }) // returns '11111111'
 * REBASE({ from: 0, base: 10, toBase: 2 }) // returns '0'
 * REBASE({ from: 'z', base: 10, toBase: 2 }) // throws Invalid digit 'z' in 'z' for base 10
 * ```
 */
export function REBASE (_: { from: numeric, base: number, toBase: number }): string {
  const { from, base, toBase } = _

  const range = SYMBOLS.split('')
  const fromRange = range.slice(0, base)
  const toRange = range.slice(0, toBase)

  let decValue = `${from}`.split('').reverse().reduce(
    // eslint-disable-next-line max-params
    (carry, digit, index) => {
      const indexOfDigit = fromRange.indexOf(digit)

      if (indexOfDigit === -1) {
        throw new Error(`Invalid digit '${digit}' in '${from}' for base ${base}`)
      }

      carry += indexOfDigit * Math.pow(base, index)

      return carry
    },
    0
  )

  let newValue = ''

  while (decValue > 0) {
    newValue = toRange[decValue % toBase] + newValue
    decValue = (decValue - (decValue % toBase)) / toBase
  }

  return (newValue === '') ? '0' : newValue
}

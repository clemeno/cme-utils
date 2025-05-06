import { SYMBOLS } from 'constant'
import type { numeric } from '../numeric.js'

/**
 * from pure numeric string in base [2,36] to base [2,36] else throws
 */
export const REBASE = (_: { from: numeric, base: number, toBase: number }): string => {
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

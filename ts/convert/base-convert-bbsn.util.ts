import { SYMBOLS } from '../constant/symbols.util.js'
import { SYMBOLS_LENGTH } from '../constant/symbols-length.util.js'
import type { numeric } from '../numeric.js'
import { TO_NUMBER } from './to-number.util.js'

/**
 * Converts a small non-negative integer from one base to another, both in 2..256 (symbols of SYMBOLS).
 * An invalid base or a symbol not allowed in the source base logs a message to the console and gives an empty string.
 * @param _ - The number and the bases
 * @param _.n - The number to convert, in the `from` base
 * @param _.from - The base of `n`
 * @param _.to - The target base
 * @returns The number written in the target base, or an empty string when an input is invalid
 * @example
 * ```typescript
 * BASE_CONVERT_BBSN({ n: 255, from: 10, to: 16 }) // returns 'ff'
 * BASE_CONVERT_BBSN({ n: 'ff', from: 16, to: 2 }) // returns '11111111'
 * BASE_CONVERT_BBSN({ n: 0, from: 10, to: 2 }) // returns '0'
 * // base 1 is not valid: logs a message
 * BASE_CONVERT_BBSN({ n: 12, from: 10, to: 1 }) // returns ''
 * ```
 */
export function BASE_CONVERT_BBSN (_: { n: numeric, from: numeric, to: numeric }): string | null {
  let res = ''

  const N = `${_.n}`
  const from = `${_.from}`
  const to = `${_.to}`
  const baseFrom = TO_NUMBER(from)
  const baseTo = TO_NUMBER(to)

  // a base is an integer in 2..SYMBOLS_LENGTH (base 1 never shrinks n and loops forever), tested as "not inside" so NaN fails too
  if (!(Number.isInteger(baseFrom) && (baseFrom >= 2) && (baseFrom <= SYMBOLS_LENGTH))) {
    console.log(`Base from ${from} not in 2..${SYMBOLS_LENGTH}`)
  } else if (!(Number.isInteger(baseTo) && (baseTo >= 2) && (baseTo <= SYMBOLS_LENGTH))) {
    console.log(`Base to ${to} not in 2..${SYMBOLS_LENGTH}`)
  } else {
    // ! here from and to are valid bases, but n may still be invalid for the from base, which is checked in the loop below
    let bError = false

    let nBaseTen = 0

    if (baseFrom === 10) {
      // the other bases check each symbol in the loop below; base 10 checks the whole string here
      bError = !/^-?\d+$/.test(N)
      nBaseTen = Number.parseInt(N)
    } else {
      const sizeN = N.length

      // ! this loop checks that each symbol in N is valid for the from base and calculates the base 10 value of N
      for (let i = 0; !bError && (i < sizeN); i += 1) {
        const Ni = N[i]

        let mul = 0

        let bMulOk = bError

        // ! this loop finds the index of the symbol in SYMBOLS, which is its value in base 10
        while (!bMulOk && (mul < SYMBOLS_LENGTH)) {
          bMulOk = Ni === SYMBOLS[mul]

          if (!bMulOk) {
            mul += 1
          }
        }

        if (!bMulOk) {
          bError = true

          console.log('Symbol not found')
        } else if (baseFrom <= mul) {
          bError = true

          console.log(`Symbol not allowed in base ${from}`)
        } else {
          const exp = sizeN - i - 1

          nBaseTen += mul * ((exp === 0) ? 1 : Math.pow(baseFrom, exp))
        }
      }
    }

    const bToBase10 = baseTo === 10

    const nTo: any[] = (nBaseTen === 0) ? [SYMBOLS[0]] : []

    if (!bError && !bToBase10) {
      // ! bError is not modified in the loop now
      // was !bError && (0 < nBaseTen)
      while (0 < nBaseTen) {
        const mod = nBaseTen % baseTo

        // if ((mod < 0) || (SYMBOLS_LENGTH <= mod)) {
        //   // ! requires mod to be negative or ≥ SYMBOLS_LENGTH, which can't happen when to is a valid base
        //   bError = true
        //   console.log(`Out of bounds mod ${mod} not in 0..${SYMBOLS_LENGTH}`)
        // } else {
        nTo.push(SYMBOLS[mod])
        nBaseTen = Number.parseInt(`${nBaseTen / baseTo}`)
        // }
      }
    }

    if (!bError) {
      res = bToBase10 ? nBaseTen.toString() : nTo.reverse().toString().replace(/,/g, '')
    }
  }

  return res
}

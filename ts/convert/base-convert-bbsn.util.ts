import { SYMBOLS } from '../constant/symbols.util.js'
import { SYMBOLS_LENGTH } from '../constant/symbols-length.util.js'
import type { numeric } from '../numeric.js'

/**
 * base convert big base small numbers
 */
export const BASE_CONVERT_BBSN = (_: { n: numeric, from: numeric, to: numeric }): string | null => {
  let res = ''

  const N = `${_.n}`
  const from = `${_.from}`
  const to = `${_.to}`

  if ((+from <= 0) || (SYMBOLS_LENGTH < +from)) {
    console.log(`Base from ${from} not in 1..${SYMBOLS_LENGTH}`)
  } else if ((+to <= 0) || (SYMBOLS_LENGTH < +to)) {
    console.log(`Base to ${to} not in 1..${SYMBOLS_LENGTH}`)
  } else {
    // ! here from and to are valid bases, but n may still be invalid for the from base, which is checked in the loop below
    let bError = false

    let nBaseTen = 0

    if (+from === 10) {
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
        } else if (+from <= mul) {
          bError = true

          console.log(`Symbol not allowed in base ${from}`)
        } else {
          const exp = sizeN - i - 1

          nBaseTen += mul * ((exp === 0) ? 1 : Math.pow(+from, exp))
        }
      }
    }

    const bToBase10 = +to === 10

    const nTo: any[] = (nBaseTen === 0) ? [SYMBOLS[0]] : []

    if (!bError && !bToBase10) {
      // ! bError is not modified in the loop now
      // was !bError && (0 < nBaseTen)
      while (0 < nBaseTen) {
        const mod = nBaseTen % +to

        // if ((mod < 0) || (SYMBOLS_LENGTH <= mod)) {
        //   // ! requires mod to be negative or ≥ SYMBOLS_LENGTH, which can't happen when to is a valid base
        //   bError = true
        //   console.log(`Out of bounds mod ${mod} not in 0..${SYMBOLS_LENGTH}`)
        // } else {
        nTo.push(SYMBOLS[mod])
        nBaseTen = Number.parseInt(`${nBaseTen / +to}`)
        // }
      }
    }

    if (!bError) {
      res = bToBase10 ? nBaseTen.toString() : nTo.reverse().toString().replace(/,/g, '')
    }
  }

  return res
}

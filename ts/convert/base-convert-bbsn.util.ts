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
    let bError = false

    let nBaseTen = 0

    if (+from === 10) {
      nBaseTen = Number.parseInt(N)
    } else {
      const sizeN = N.length

      for (let i = 0; !bError && (i < sizeN); i += 1) {
        const Ni = N[i]

        let mul = 0

        let bMulOk = bError

        while (!bMulOk && (mul < SYMBOLS_LENGTH)) {
          bMulOk = Ni === SYMBOLS[mul]

          if (!bMulOk) {
            mul += 1
          }
        }

        if (+from <= mul) {
          bError = true
          console.log(`Symbol not allowed in base ${from}`)
        } else if (bMulOk) {
          bError = true
          console.log('Symbol not found')
        } else {
          const exp = sizeN - i - 1
          nBaseTen += mul * ((exp === 0) ? 1 : Math.pow(+from, exp))
        }
      }
    }

    const bToBase10 = +to === 10

    const nTo: any[] = (nBaseTen === 0) ? [SYMBOLS[0]] : []

    if (!bError && !bToBase10) {
      while (!bError && (nBaseTen > 0)) {
        const mod = nBaseTen % +to

        if ((mod < 0) || (SYMBOLS_LENGTH <= mod)) {
          bError = true
          console.log(`Out of bounds mod ${mod} not in 0..${SYMBOLS_LENGTH}`)
        } else {
          nTo.push(SYMBOLS[mod])
          nBaseTen = Number.parseInt(`${nBaseTen / +to}`)
        }
      }
    }

    if (!bError) {
      res = bToBase10 ? nBaseTen.toString() : nTo.reverse().toString().replace(/,/g, '')
    }
  }

  return res
}

import { IS_SET } from '../check/is-set.util.js'
import type { numeric } from '../numeric.js'

export const BIG_10_TO_BIG_16 = (_s: numeric): string => {
  const hex: Array<string | undefined> = []

  const sStr = (IS_SET(_s) && (((typeof _s === 'number') && !isNaN(_s)) || (_s !== 'NaN'))) ? `${_s}` : ''

  if (sStr === '0') {
    hex.push('0')
  } else {
    const dec = sStr.split('')
    const sum: number[] = []
    let i: number
    let s: number

    while (dec.length !== 0) {
      s = +(dec.shift() ?? 0)
      for (i = 0; (s !== 0) || i < sum.length; i += 1) {
        s += ((sum[i] ?? 0)) * 10
        sum[i] = s % 16
        s = (s - sum[i]) / 16
      }
    }

    while (sum.length !== 0) {
      hex.push(sum.pop()?.toString(16))
    }
  }

  return hex.join('')
}

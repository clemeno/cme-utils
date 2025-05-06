import { IS_SET } from '../check/is-set.util.js'
import type { numeric } from '../numeric.js'
import { BIG_ADD_10 } from './big-add-10.util.js'

export const BIG_16_TO_BIG_10 = (_s: numeric): string => {
  let dec = '0'

  const input = (IS_SET(_s) && (((typeof _s === 'number') && !isNaN(_s)) || (_s !== 'NaN'))) ? `${_s}` : ''

  for (const c of input.split('')) {
    const n = Number.parseInt(c, 16)

    for (let t = 8; t !== 0; t >>= 1) {
      dec = BIG_ADD_10({ x: dec, y: dec })

      if ((n & t) !== 0) {
        dec = BIG_ADD_10({ x: dec, y: '1' })
      }
    }
  }

  return (input !== '') ? dec : ''
}

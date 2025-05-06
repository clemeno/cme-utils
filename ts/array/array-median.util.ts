import { IS_ON } from '../check/is-on.util.js'
import { TO_NUMBER } from '../convert/to-number.util.js'
import type { numeric } from '../numeric.js'

export const ARRAY_MEDIAN = (arr: numeric[]): number => {
  let res = NaN

  const count = arr.length

  if (0 < count) {
    // eslint-disable-next-line max-params
    const sortedNList = arr.slice().map(TO_NUMBER).sort((a, b) => a - b)

    const indexM = Math.floor(count / 2)

    res = IS_ON(count % 2) ? sortedNList[indexM] : ((+sortedNList[indexM] + +sortedNList[indexM + 1]) / 2)
  }

  return res
}

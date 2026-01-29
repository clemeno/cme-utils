import { IS_NUMERIC } from '../check/is-numeric.util.js'
import type { numeric } from '../numeric.js'
import { ARRAY_SUM } from './array-sum.util.js'

export const ARRAY_AVERAGE = (a: numeric[]): number => {
  const validLength = a.filter(v => IS_NUMERIC(v)).length
  return (0 < validLength) ? (ARRAY_SUM(a) / validLength) : NaN
}

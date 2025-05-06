import type { numeric } from '../numeric.js'
import { ARRAY_SUM } from './array-sum.util'

export const ARRAY_AVERAGE = (a: numeric[]): number => (0 < a.length) ? (ARRAY_SUM(a) / a.length) : NaN

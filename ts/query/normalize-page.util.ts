import type { numeric } from '../numeric.js'
import { NORMALIZE_N_1 } from './normalize-n-1.util.js'

export const NORMALIZE_PAGE = (_: { page: numeric, normalizedPages: numeric }): string => {
  return NORMALIZE_N_1({ n: _.page, max: _.normalizedPages })
}

import type { numeric } from '../numeric.js'
import { NORMALIZE_N_1 } from './normalize-n-1.util.js'

export const NORMALIZE_PER_PAGE = (perPage: numeric): string => NORMALIZE_N_1({ n: perPage, max: Number.MAX_SAFE_INTEGER })

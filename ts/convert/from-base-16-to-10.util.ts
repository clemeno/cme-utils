import type { numeric } from '../numeric.js'
import { BIG_16_TO_BIG_10 } from './big-16-to-big-10.util.js'

export const FROM_BASE_16_TO_10 = (_: numeric): string => BIG_16_TO_BIG_10(_)

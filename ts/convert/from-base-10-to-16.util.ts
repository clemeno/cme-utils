import type { numeric } from '../numeric.js'
import { BIG_10_TO_BIG_16 } from './big-10-to-big-16.util.js'

export function FROM_BASE_10_TO_16 (_: numeric): string {
  return BIG_10_TO_BIG_16(_)
}

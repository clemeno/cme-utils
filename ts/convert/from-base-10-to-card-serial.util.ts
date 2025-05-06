import type { numeric } from '../numeric.js'
import { FROM_BASE_10_TO_16 } from './from-base-10-to-16.util.js'
import { FROM_BASE_16_TO_CARD_SERIAL } from './from-base-16-to-card-serial.util.js'

export const FROM_BASE_10_TO_CARD_SERIAL = (_: numeric): string => FROM_BASE_16_TO_CARD_SERIAL(FROM_BASE_10_TO_16(_))

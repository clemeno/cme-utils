import { SYMBOLS_BASE_256 } from '../constant/symbols-base-256.util.js'
import { PARSE_INT_FROM_CUSTOM_BASE } from './parse-int-from-custom-base.util.js'
import { TO_ANY_ARRAY } from './to-any-array.util.js'

export const BASE_256_TO_ARRAY_10 = (s: string): number[] => {
  const base = SYMBOLS_BASE_256

  return TO_ANY_ARRAY(s).map((input: string) => PARSE_INT_FROM_CUSTOM_BASE({ input, base }))
}

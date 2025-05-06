import { IS_SET } from '../check/is-set.util.js'
import { IGNORE_DUPLICATES } from './ignore-duplicates.util.js'

export const TO_UNIQUE_ARRAY = (_: { from: any[], on?: (element: any) => any }): any[] => {
  const { from, on } = _
  return IS_SET(on) ? from.filter(IGNORE_DUPLICATES(on ?? (e => true))) : Array.from(new Set(from))
}

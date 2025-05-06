import { ARRAY_LIKE_10_TO_ARRAY_16 } from './array-like-10-to-array-16.util.js'
import { TO_ANY_ARRAY } from './to-any-array.util.js'

export const BUFFER_TO_UUID = (b: any): string => {
  const input = TO_ANY_ARRAY(b).slice(0, 16)

  const parts = [
    input.slice(0, 4),
    input.slice(4, 6),
    input.slice(6, 8),
    input.slice(8, 10),
    input.slice(10, 16),
  ]

  return parts.map(p => ARRAY_LIKE_10_TO_ARRAY_16(p).map(s => s.padStart(2, '0')).join('')).join('-')
}

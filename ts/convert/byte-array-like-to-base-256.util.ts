import { BASE_CONVERT_BBSN } from './base-convert-bbsn.util.js'
import { TO_ANY_ARRAY } from './to-any-array.util.js'
import { TO_STRING } from './to-string.util.js'

export const BYTE_ARRAY_LIKE_TO_BASE_256 = (o: any): string => {
  return TO_ANY_ARRAY(o).map(v => BASE_CONVERT_BBSN({ n: TO_STRING(v), from: 10, to: 256 })).join('')
}

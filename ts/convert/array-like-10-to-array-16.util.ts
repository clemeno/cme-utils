import { FROM_BASE_10_TO_16 } from './from-base-10-to-16.util.js'
import { TO_ANY_ARRAY } from './to-any-array.util.js'
import { TO_STRING } from './to-string.util.js'

export const ARRAY_LIKE_10_TO_ARRAY_16 = (b: any): string[] => TO_ANY_ARRAY(b).map(v => FROM_BASE_10_TO_16(TO_STRING(v)))

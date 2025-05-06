import { IS_EMPTY } from '../check/is-empty.util.js'

export const TO_BOOLEAN = (v: any): boolean => (typeof v === 'boolean') ? v : !IS_EMPTY(v)

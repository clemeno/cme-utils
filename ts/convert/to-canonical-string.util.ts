import { TO_STRING } from './to-string.util.js'

export const TO_CANONICAL_STRING = (_: any): string => {
  return TO_STRING(_).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

import { STRING_TO_HEX } from './string-to-hex.util.js'

/**
 * Convert a string to uuid without using Buffer
 */
export const STRING_TO_UUID = (str: string): string => {
  const hex = STRING_TO_HEX(str).toLowerCase().padStart(32, '0').slice(0, 32)
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

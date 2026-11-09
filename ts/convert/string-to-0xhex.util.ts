import { STRING_TO_HEX } from './string-to-hex.util.js'

/**
 * Convert a string to 0xhex without using Buffer
 */
export function STRING_TO_0XHEX (str: string): string {
  return `0x${STRING_TO_HEX(str)}`
}

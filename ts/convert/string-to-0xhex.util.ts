import { STRING_TO_HEX } from './string-to-hex.util.js'

/**
 * Convert a string to 0xhex without using Buffer
 * @param str - The string to convert, one hex code per UTF-16 character
 * @returns `0x` followed by the hexadecimal codes of the characters
 * @example
 * ```typescript
 * STRING_TO_0XHEX('Hi') // returns '0x4869'
 * STRING_TO_0XHEX('') // returns '0x'
 * ```
 */
export function STRING_TO_0XHEX (str: string): string {
  return `0x${STRING_TO_HEX(str)}`
}

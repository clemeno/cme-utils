/**
 * Convert a string to hex without using Buffer
 * @param str - The string to convert, one hex code of at least 2 digits per UTF-16 character
 * @returns The hexadecimal codes of the characters, concatenated
 * @example
 * ```typescript
 * STRING_TO_HEX('Hi') // returns '4869'
 * STRING_TO_HEX('\n\tA') // returns '0a0941'
 * STRING_TO_HEX('') // returns ''
 * ```
 */
export function STRING_TO_HEX (str: string): string {
  let hex = ''

  for (let i = 0; i < str.length; i += 1) {
    hex += str.charCodeAt(i).toString(16).padStart(2, '0')
  }

  return hex
}

import { STRING_TO_HEX } from './string-to-hex.util.js'

/**
 * Convert a string to uuid without using Buffer
 * @param str - The string to convert, its hex codes are left-padded with zeros to 32 digits (longer ones are cut)
 * @returns The UUID string `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
 * @example
 * ```typescript
 * STRING_TO_UUID('Hi') // returns '00000000-0000-0000-0000-000000004869'
 * STRING_TO_UUID('') // returns '00000000-0000-0000-0000-000000000000'
 * ```
 */
export function STRING_TO_UUID (str: string): string {
  const hex = STRING_TO_HEX(str).toLowerCase().padStart(32, '0').slice(0, 32)
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

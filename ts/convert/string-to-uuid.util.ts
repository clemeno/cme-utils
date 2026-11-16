import { FROM_HEX_TO_UUID } from '../uuid/from-hex-to-uuid.util.js'
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
  return FROM_HEX_TO_UUID(STRING_TO_HEX(str))
}

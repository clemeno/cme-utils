import { IS_UUID_STRING } from '../uuid/is-uuid-string.util.js'

/**
 * Checks whether a string is a valid UUID.
 * @param s - The string to check
 * @returns true if `s` is a valid UUID, false otherwise
 * @example
 * ```typescript
 * IS_UUID('123e4567-e89b-12d3-a456-426614174000') // returns true
 * IS_UUID('not-a-uuid') // returns false
 * IS_UUID('') // returns false
 * ```
 */
export function IS_UUID (s: string): boolean {
  return IS_UUID_STRING(s)
}

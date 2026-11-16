import { REGEX_UUID_MATCH_A_SUBSTRING } from '../regex/regex-uuid-match-a-substring.util.js'

/**
 * Extracts a UUID from a string `s`, if any substring is a UUID.
 * @param s - The string to search
 * @returns The first UUID found, or '' (empty string) if no UUID is found
 * @example
 * ```typescript
 * EXTRACT_UUID_FROM_STRING('file-123e4567-e89b-12d3-a456-426614174000.png') // returns '123e4567-e89b-12d3-a456-426614174000'
 * EXTRACT_UUID_FROM_STRING('123e4567-e89b-12d3-a456-426614174000') // returns '123e4567-e89b-12d3-a456-426614174000'
 * EXTRACT_UUID_FROM_STRING('no uuid here') // returns ''
 * ```
 */
export function EXTRACT_UUID_FROM_STRING (s: string): string {
  // a whole UUID string is its own first match
  return s.match(REGEX_UUID_MATCH_A_SUBSTRING)?.[0] ?? ''
}

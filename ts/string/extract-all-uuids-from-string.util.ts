import { REGEX_UUID_MATCH_EACH_SUBSTRING } from '../regex/regex-uuid-match-each-substring.util.js'

/**
 * Extracts all UUIDs from a string `s`, if any substring is a UUID.
 * @param s - The string to search
 * @returns An array of the UUIDs found, or [] (empty array) if no UUID is found
 * @example
 * ```typescript
 * EXTRACT_ALL_UUIDS_FROM_STRING('a 123e4567-e89b-12d3-a456-426614174000 b 123e4567-e89b-12d3-a456-426614174000') // returns ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000']
 * EXTRACT_ALL_UUIDS_FROM_STRING('no uuid here') // returns []
 * EXTRACT_ALL_UUIDS_FROM_STRING('') // returns []
 * ```
 */
export function EXTRACT_ALL_UUIDS_FROM_STRING (s: string): string[] {
  return s.match(REGEX_UUID_MATCH_EACH_SUBSTRING) ?? []
}

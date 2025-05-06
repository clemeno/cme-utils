import { REGEX_UUID_MATCH_EACH_SUBSTRING } from '../regex/regex-uuid-match-each-substring.util.js'

/**
 * Extracts all UUIDs from a string `s`, if any substring is a UUID
 * @returns {string[]} an array of UUIDs or [] (empty array) if no UUID is found
 */
export const EXTRACT_ALL_UUIDS_FROM_STRING = (s: string): string[] => {
  return s.match(REGEX_UUID_MATCH_EACH_SUBSTRING) ?? []
}

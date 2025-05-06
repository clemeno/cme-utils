import { IS_AN_ARRAY_AND_NOT_EMPTY } from '../check/is-an-array-and-not-empty.util.js'
import { REGEX_UUID_MATCH_A_SUBSTRING } from '../regex/regex-uuid-match-a-substring.util.js'
import { IS_UUID } from './is-uuid.util.js'

/**
 * Extracts a UUID from a string `s`, if any substring is a UUID
 * @returns {string} the first UUID found or '' (empty string) if no UUID is found
 */
export const EXTRACT_UUID_FROM_STRING = (s: string): string => {
  let res = ''

  if (IS_UUID(s)) {
    res = s
  } else {
    const matchList = s.match(REGEX_UUID_MATCH_A_SUBSTRING)

    if (IS_AN_ARRAY_AND_NOT_EMPTY(matchList)) {
      res = matchList[0]
    }
  }

  return res
}

import { IS_A_STRING_AND_NOT_EMPTY } from '../string/is-a-string-and-not-empty.util.js'
import { TO_STRING } from './to-string.util.js'

/**
 * Parses a JSON string into a value.
 * @param json - The JSON string, optional
 * @returns The parsed value, or an empty string when the input is missing, empty or not valid JSON
 * @example
 * ```typescript
 * TO_ANY('{"a":1}') // returns { a: 1 }
 * TO_ANY('[1,2]') // returns [1, 2]
 * TO_ANY('not json') // returns ''
 * TO_ANY('') // returns ''
 * TO_ANY() // returns ''
 * ```
 */
export function TO_ANY (json?: string): any {
  let res: string = ''

  if (IS_A_STRING_AND_NOT_EMPTY(json)) {
    try { res = JSON.parse(TO_STRING(json)) } catch { }
  }

  return res
}

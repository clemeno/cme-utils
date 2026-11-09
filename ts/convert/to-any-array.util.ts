import { IS_AN_ARRAY } from '../array/is-an-array.util.js'

/**
 * Converts an array, array-like or iterable (string, Set, typed array...) into an array.
 * @param from - The value to convert
 * @returns The same array when the input is one, a new array of its items for an iterable, else an empty array
 * @example
 * ```typescript
 * TO_ANY_ARRAY([1, 2]) // returns [1, 2]
 * TO_ANY_ARRAY('ab') // returns ['a', 'b']
 * TO_ANY_ARRAY(new Set([1, 2])) // returns [1, 2]
 * TO_ANY_ARRAY(5) // returns []
 * TO_ANY_ARRAY(null) // returns []
 * ```
 */
export function TO_ANY_ARRAY (from: any): any[] {
  let res: any[] = []

  if (IS_AN_ARRAY(from)) {
    res = from
  } else {
    try { res = Array.from(from as ArrayLike<any> | Iterable<any>) } catch { }
  }

  return res
}

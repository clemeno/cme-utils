import { IS_AN_ARRAY } from '../array/is-an-array.util.js'

/**
 * Converts an array, array-like or iterable (string, Set, typed array...) into a typed array.
 * @param from - The value to convert
 * @returns The same array when the input is one, a new array of its items for an iterable, else an empty array
 * @example
 * ```typescript
 * TO_ARRAY([1, 2]) // returns [1, 2]
 * TO_ARRAY('ab') // returns ['a', 'b']
 * TO_ARRAY(new Set([1, 2])) // returns [1, 2]
 * TO_ARRAY(null) // returns []
 * ```
 */
export function TO_ARRAY<T> (from: any): T[] {
  let res: T[] = []

  if (IS_AN_ARRAY(from)) {
    res = from
  } else {
    try { res = Array.from(from as ArrayLike<any> | Iterable<any>) } catch { }
  }

  return res
}

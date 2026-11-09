import { IS_SET } from '../check/is-set.util.js'
import { IGNORE_DUPLICATES } from './ignore-duplicates.util.js'

/**
 * Removes the duplicates of an array, keeping the first of each, by value or by a computed key.
 * @param _ - The array and the optional key getter
 * @param _.from - The array to dedupe
 * @param _.on - Gets the value that identifies an element, optional: the element itself when missing
 * @returns A new array without duplicates
 * @example
 * ```typescript
 * TO_UNIQUE_ARRAY({ from: [1, 2, 2, 3, 1] }) // returns [1, 2, 3]
 * TO_UNIQUE_ARRAY({ from: [{ id: 1, v: 'a' }, { id: 1, v: 'b' }, { id: 2, v: 'c' }], on: x => x.id }) // returns [{ id: 1, v: 'a' }, { id: 2, v: 'c' }]
 * TO_UNIQUE_ARRAY({ from: [] }) // returns []
 * ```
 */
export function TO_UNIQUE_ARRAY (_: { from: any[], on?: (element: any) => any }): any[] {
  const { from, on } = _
  return IS_SET(on) ? from.filter(IGNORE_DUPLICATES(on)) : Array.from(new Set(from))
}

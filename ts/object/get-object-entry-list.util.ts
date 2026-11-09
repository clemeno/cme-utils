import type { objectEntryListType } from '../object-entry-list-type.js'

/**
 * More accurately typed than the `.entries` method on any `object` instance
 * @param o - The object to get the entries from
 * @returns The list of entries of an `object` as an array of pair of [key, value]
 * @example
 * ```typescript
 * GET_OBJECT_ENTRY_LIST({ a: 1, b: 'x' }) // returns [['a', 1], ['b', 'x']]
 * GET_OBJECT_ENTRY_LIST({}) // returns []
 * GET_OBJECT_ENTRY_LIST(['x']) // returns [['0', 'x']]
 * ```
 */
export function GET_OBJECT_ENTRY_LIST<T = any> (o: T): objectEntryListType<T> {
  return Object.entries(o as any) as any
}

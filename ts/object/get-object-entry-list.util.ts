import type { objectEntryListType } from '../object-entry-list-type.js'

/**
 * More accurately typed than the `.entries` method on any `object` instance
 * @param o the object to get the entries from
 * @returns the list of entries of an `object` as an array of pair of [key, value]
 */
export const GET_OBJECT_ENTRY_LIST = <T = any> (o: T): objectEntryListType<T> => Object.entries(o as any) as any

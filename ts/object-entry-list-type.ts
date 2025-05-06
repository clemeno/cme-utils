/**
 * Accurately typed result of `.entries`
 * @returns the list of entries of an `Array` as an array of pair of [key, value]
 */
export type objectEntryListType<T = any> = Array<{ [K in keyof T]: [K, T[K]] }[keyof T]>

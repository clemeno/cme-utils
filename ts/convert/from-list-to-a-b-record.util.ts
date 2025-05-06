import { GET_ANY_OBJECT } from '../factory/get-any-object.util.js'

/**
 * Converts a `Array<T extends Record<PropertyKey, any>>` into a `Record<T[K], T[V]>` using specified keys
 * @param list Array of objects to convert
 * @param keyA Name of the property to use as Record key
 * @param keyB Name of the property to use as Record value
 * @returns Record mapping keyA values to keyB values
 */
export function FROM_LIST_TO_A_B_RECORD<
  T extends Record<PropertyKey, any>,
  K extends keyof T,
  V extends keyof T
> (_: { list: T[] | ReadonlyArray<T>, keyA: K, keyB: V }): Record<T[K], T[V]> {
  const res = GET_ANY_OBJECT()

  for (const row of _.list) {
    res[row[_.keyA]] = row[_.keyB]
  }

  return res as Record<T[K], T[V]>
}

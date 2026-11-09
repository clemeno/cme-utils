/**
 * More accurately typed than the `.keys` method on any `object` instance
 * @param o - The object to get the keys from
 * @returns The list of keys of an object as an array of any type a key can be
 * @example
 * ```typescript
 * GET_OBJECT_KEY_LIST({ a: 1, b: 2 }) // returns ['a', 'b']
 * GET_OBJECT_KEY_LIST({}) // returns []
 * GET_OBJECT_KEY_LIST(['x', 'y']) // returns ['0', '1']
 * ```
 */
export function GET_OBJECT_KEY_LIST<T = any> (o: T): Array<keyof T> {
  return Object.keys(o as any) as any
}
